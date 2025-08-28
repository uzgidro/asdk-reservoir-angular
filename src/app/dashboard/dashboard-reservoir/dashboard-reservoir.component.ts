import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReservoirAnalyticsComponent} from "../../reservoir/reservoir-analytics/reservoir-analytics.component";
import {ActivatedRoute, Router} from "@angular/router";
import {BrodacastService} from "../../service/brodacast.service";
import {ApiService} from "../../service/api.service";
import {CategorisedArrayResponse, ComplexValueResponse} from "../../shared/response/values-response";
import {AsyncPipe, DecimalPipe, NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {WeatherDetailedFrameComponent} from "../../shared/component/wearher-detailed/weather-detailed-frame.component";
import {CardWrapperComponent} from "../../shared/component/card-wrapper/card-wrapper.component";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {ModsnowService} from "../../service/modsnow.service";
import {LoaderComponent} from "../../shared/component/loader/loader.component";
import {DashboardSnowReviewComponent} from "../dashboard-snow-review/dashboard-snow-review.component";
import {combineLatest, distinctUntilChanged, filter, map, Observable, of, Subject, switchMap, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-dashboard-reservoir',
  imports: [
    ReservoirAnalyticsComponent,
    NgIf,
    WeatherDetailedFrameComponent,
    CardWrapperComponent,
    DecimalPipe,
    NgClass,
    CardHeaderComponent,
    LoaderComponent,
    DashboardSnowReviewComponent,
    AsyncPipe,
    NgOptimizedImage
  ],
  templateUrl: './dashboard-reservoir.component.html',
  standalone: true,
  styleUrl: './dashboard-reservoir.component.css'
})
export class DashboardReservoirComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  selectedReservoir: number = 1

  reservoirs: ReservoirResponse[] = [];

  snowImages$!: Observable<any>;

  incomeData: { value: number, difference: number }[] = []
  releaseData: { value: number, difference: number }[] = []
  levelData: { value: number, difference: number }[] = []
  volumeData: { value: number, difference: number }[] = []

  get income() {
    return this.incomeData[this.selectedReservoir - 1]
  }

  get release() {
    return this.releaseData[this.selectedReservoir - 1]
  }

  get level() {
    return this.levelData[this.selectedReservoir - 1]
  }

  get volume() {
    return this.volumeData[this.selectedReservoir - 1]
  }

  get reservoir() {
    return this.reservoirs[this.selectedReservoir - 1]
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private modsnow: ModsnowService,
    private broadcast: BrodacastService
  ) {
  }

  ngOnInit() {
    // Combine data streams for a more reactive approach
    combineLatest([
      this.api.getReservoirs(), // Load reservoir list
      this.api.getDashboardValues(), // Load chart data
      this.activatedRoute.queryParams.pipe( // Track queryParams changes
        map(params => params['reservoir']),
        tap(reservoirId => {
          // If reservoir param is missing, set a default
          if (!reservoirId) {
            this.router.navigate([], {
              relativeTo: this.activatedRoute,
              queryParams: {reservoir: 1},
              queryParamsHandling: 'merge'
            });
          }
        }),
        filter(reservoirId => !!reservoirId), // Continue only if ID exists
        distinctUntilChanged() // Avoid re-fetching for the same ID
      )
    ]).pipe(
      tap(([reservoirsResponse, dashboardValuesResponse, currentReservoirId]) => {
        // Update reservoir list
        this.reservoirs = reservoirsResponse;
        // Set the selected reservoir
        this.selectedReservoir = parseInt(currentReservoirId);
        // Setup chart data
        this.setupChartData(dashboardValuesResponse);
      }),
      switchMap(([, , currentReservoirId]) => {
        // After getting all main data, fetch snowImages
        return this.modsnow.getReservoir(parseInt(currentReservoirId));
      }),
      takeUntil(this.destroy$) // Unsubscribe on component destruction
    ).subscribe(
      snowImagesResponse => {
        this.snowImages$ = of(snowImagesResponse); // Wrap in an Observable for the async pipe
      },
      error => console.error('Error loading data:', error)
    );

    // Handle external changes to the reservoir from the broadcast service (separate subscription)
    this.broadcast.reservoir
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {reservoir: value},
          queryParamsHandling: 'merge',
        });
      });
  }

  private setupChartData(data: CategorisedArrayResponse) {
    this.incomeData = data.income.map(it => {
      return this.getValueWithDifference(it)
    })

    this.releaseData = data.release.map(it => {
      return this.getValueWithDifference(it)
    })

    this.levelData = data.level.map(it => {
      return this.getValueWithDifference(it)
    })

    this.volumeData = data.volume.map(it => {
      return this.getValueWithDifference(it)
    })
  }

  private getValueWithDifference(response: ComplexValueResponse) {
    let valueAtDayBegin = response.data.find(value => {
      return value.date.includes('06:00:00')
    });
    if (valueAtDayBegin) {
      return {
        value: response.data[0].value,
        difference: response.data[0].value - valueAtDayBegin.value
      }
    } else {
      return {
        value: response.data[0].value,
        difference: response.data[0].value - response.data[1].value
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
