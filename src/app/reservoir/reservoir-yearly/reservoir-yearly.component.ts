import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {ActivatedRoute} from "@angular/router";
import {CategorisedValueResponse} from "../../shared/response/values-response";
import {combineLatest, distinctUntilChanged, filter, map, Subject, switchMap, takeUntil} from "rxjs";
import {DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {DecadeService} from "../decade.service";
import {Decade} from "../../shared/interfaces";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {CardWrapperComponent} from "../../shared/component/card-wrapper/card-wrapper.component";

@Component({
  selector: 'app-reservoir-yearly',
  templateUrl: './reservoir-yearly.component.html',
  styleUrl: './reservoir-yearly.component.css',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DecimalPipe,
    DatePipe,
    CardHeaderComponent,
    CardWrapperComponent
  ]
})
export class ReservoirYearlyComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  reservoirName?: string
  category = 0;

  tableData: Decade[] = []
  months: string[] = this.decadeService.months;
  decade: string[] = this.decadeService.decade;


  constructor(
    private api: ApiService,
    private decadeService: DecadeService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(
      map(params => params['reservoir']),
      filter(reservoirId => !!reservoirId),
      distinctUntilChanged(),
      switchMap(reservoirId => combineLatest({
        reservoirInfo: this.api.getReservoirById(reservoirId),
        decadeValues: this.api.getDecadeYearsValues(reservoirId)
      })),
      takeUntil(this.destroy$)
    ).subscribe(({reservoirInfo, decadeValues}) => {
      this.reservoirName = reservoirInfo.name;
      this.tableData = [
        this.decadeService.setDecade('Kelishi, m³/s', decadeValues.income.data, false),
        this.decadeService.setDecade('Chiqish, m³/s', decadeValues.release.data, false),
        this.decadeService.setDecade('Suv sathi, m', decadeValues.level.data, false),
        this.decadeService.setDecade('Suv hajmi, mln.m³', decadeValues.volume.data, false),
      ];
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
