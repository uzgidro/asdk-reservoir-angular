import {Component, NgZone, OnInit} from '@angular/core';
import {ReservoirAnalyticsComponent} from "../../reservoir/reservoir-analytics/reservoir-analytics.component";
import {ActivatedRoute, Router} from "@angular/router";
import {BrodacastService} from "../../service/brodacast.service";
import {ApiService} from "../../service/api.service";
import {CategorisedArrayResponse} from "../../shared/response/values-response";
import {DecimalPipe, NgClass, NgIf} from "@angular/common";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {WeatherDetailedFrameComponent} from "../../shared/component/wearher-detailed/weather-detailed-frame.component";
import {CardWrapperComponent} from "../../shared/component/card-wrapper/card-wrapper.component";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {ModsnowService} from "../../service/modsnow.service";
import {ModsnowImageResponse} from "../../shared/response/modsnow-response";
import {LoaderComponent} from "../../shared/component/loader/loader.component";
import {DashboardSnowReviewComponent} from "../dashboard-snow-review/dashboard-snow-review.component";

@Component({
  selector: 'app-dashboard-reservoir',
  standalone: true,
  imports: [
    ReservoirAnalyticsComponent,
    NgIf,
    WeatherDetailedFrameComponent,
    CardWrapperComponent,
    DecimalPipe,
    NgClass,
    CardHeaderComponent,
    LoaderComponent,
    DashboardSnowReviewComponent
  ],
  templateUrl: './dashboard-reservoir.component.html',
  styleUrl: './dashboard-reservoir.component.css'
})
export class DashboardReservoirComponent implements OnInit {

  selectedReservoir: number = 1

  reservoirs: ReservoirResponse[] = []

  snowImages: ModsnowImageResponse[] = []

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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private api: ApiService, private modsnow: ModsnowService, private broadcast: BrodacastService, private zone: NgZone) {
  }

  ngOnInit() {
    this.broadcast.reservoir.subscribe({
      next: value => {
        this.zone.run(() => {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {reservoir: value},
            queryParamsHandling: 'merge', // Сохраняем существующие queryParams
          });
        })
      }
    })

    this.activatedRoute.queryParams.subscribe({
      next: value => {
        let reservoirId = value['reservoir'];
        if (reservoirId == undefined) {
          this.zone.run(async () => {
            await this.router.navigate([], {
              relativeTo: this.activatedRoute,
              queryParams: {reservoir: 1},
              queryParamsHandling: 'merge', // Сохраняем существующие queryParams
            })
          })
        } else {
          this.selectedReservoir = reservoirId
          console.log(reservoirId)
          this.modsnow.getReservoir(parseInt(reservoirId)).subscribe({
            next: value => {
              console.log(value)
              this.snowImages = value
            }
          })
        }
      }
    })

    this.api.getDashboardValues().subscribe({
      next: (response: CategorisedArrayResponse) => {
        this.setupChartData(response)
      }
    })

    this.api.getReservoirs().subscribe({
      next: (response: ReservoirResponse[]) => {
        this.reservoirs = response
      }
    })
  }

  private setupChartData(data: CategorisedArrayResponse) {
    this.incomeData = data.income.map(it => {
      return {
        value: it.data.reverse()[0].value,
        difference: it.data.reverse()[1].value - it.data.reverse()[0].value
      }
    })

    this.releaseData = data.release.map(it => {
      return {
        value: it.data.reverse()[0].value,
        difference: it.data.reverse()[1].value - it.data.reverse()[0].value
      }
    })

    this.levelData = data.level.map(it => {
      return {
        value: it.data.reverse()[0].value,
        difference: it.data.reverse()[1].value - it.data.reverse()[0].value
      }
    })

    this.volumeData = data.volume.map(it => {
      return {
        value: it.data.reverse()[0].value,
        difference: it.data.reverse()[1].value - it.data.reverse()[0].value
      }
    })
  }
}
