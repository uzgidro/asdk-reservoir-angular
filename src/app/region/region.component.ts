import {Component, OnInit} from '@angular/core';
import {TimeService} from "../shared/service/time.service";
import {RegionService} from "../shared/service/region.service";
import {Region} from "../shared/interfaces";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {DatePipe, DecimalPipe, NgClass, NgIf} from "@angular/common";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AggregateTableFieldComponent} from "../shared/component/aggregate-table-field/aggregate-table-field.component";
import {GesVerticalTableComponent} from "../shared/component/get-vertical-table/ges-vertical-table.component";
import {ChartsTempComponent} from "../shared/temp/charts-temp/charts-temp.component";
import {LoaderComponent} from "../shared/component/loader/loader.component";

@Component({
    selector: 'app-region',
    templateUrl: './region.component.html',
    styleUrls: ['./region.component.css'],
    imports: [
        NgIf,
        MatTooltipModule,
        AggregateTableFieldComponent,
        DatePipe,
        DecimalPipe,
        RouterLink,
        NgClass,
        GesVerticalTableComponent,
        ChartsTempComponent,
        LoaderComponent
    ],
  standalone: true,
})
export class RegionComponent implements OnInit {

  currentTime?: Date
  currentRegion?: Region
  queryRegion?: string
  regionsInfo?: {
    reservoirCount: number,
    gesCount: number,
    aggregateCount: number,
    activePower: number,
    activePowerAtMoment: number,
    reactivePower: number,
    frequency: number
  }

  constructor(
    private _timeService: TimeService,
    public _regionService: RegionService,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this._route.queryParams
      .subscribe(params => {
        this.queryRegion = params['name']
      })

    this.updateTime();

    this.regionsInfo = {
      reservoirCount: this._regionService.regions.reduce(
        (accumulator, region) => accumulator + region.reservoirCount, 0),
      gesCount: this._regionService.regions.reduce(
        (accumulator, region) => accumulator + region.gesCount, 0),
      aggregateCount: this._regionService.regions.reduce(
        (accumulator, region) => accumulator + region.aggregateCount, 0),
      activePower: this._regionService.regions.reduce(
        (accumulator, region) => accumulator + region.activePower, 0),
      activePowerAtMoment: this._regionService.regions.reduce(
        (accumulator, region) => accumulator + region.activePowerAtMoment, 0),
      reactivePower: 1000,
      frequency: 50
    }
  }

  hoverRegion(region: Region) {
    this.currentRegion = region
  }

  private updateTime() {
    this._timeService.getCurrentTime().subscribe((data: any) => this.currentTime = data);
  }
}
