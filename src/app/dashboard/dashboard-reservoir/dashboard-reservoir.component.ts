import {Component, NgZone, OnInit} from '@angular/core';
import {ReservoirAnalyticsComponent} from "../../reservoir/reservoir-analytics/reservoir-analytics.component";
import {ActivatedRoute, Router} from "@angular/router";
import {BrodacastService} from "../../service/brodacast.service";
import {ApiService} from "../../service/api.service";
import {CategorisedArrayResponse} from "../../shared/response/values-response";
import {DateChart} from "../../shared/struct/chart";
import {ChartComponent} from "../../reservoir/reservoir-hourly/chart/chart.component";
import {NgIf} from "@angular/common";
import {DashboardSnowReviewComponent} from "../dashboard-snow-review/dashboard-snow-review.component";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {WeatherDetailedFrameComponent} from "../../shared/component/wearher-detailed/weather-detailed-frame.component";

@Component({
  selector: 'app-dashboard-reservoir',
  standalone: true,
  imports: [
    ReservoirAnalyticsComponent,
    ChartComponent,
    NgIf,
    DashboardSnowReviewComponent,
    WeatherDetailedFrameComponent
  ],
  templateUrl: './dashboard-reservoir.component.html',
  styleUrl: './dashboard-reservoir.component.css'
})
export class DashboardReservoirComponent implements OnInit {

  selectedReservoir: number = 1

  reservoirs: ReservoirResponse[] = []

  incomeCharts: DateChart[] = []
  releaseCharts: DateChart[] = []
  levelCharts: DateChart[] = []
  volumeCharts: DateChart[] = []

  get incomeChart() {
    return this.incomeCharts[this.selectedReservoir - 1]
  }

  get releaseChart() {
    return this.releaseCharts[this.selectedReservoir - 1]
  }

  get levelChart() {
    return this.levelCharts[this.selectedReservoir - 1]
  }

  get volumeChart() {
    return this.volumeCharts[this.selectedReservoir - 1]
  }

  get reservoir() {
    return this.reservoirs[this.selectedReservoir - 1]
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private api: ApiService, private broadcast: BrodacastService, private zone: NgZone) {
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
        } else this.selectedReservoir = reservoirId
      }
    })

    this.api.getDashboardValues().subscribe({
      next: (response: CategorisedArrayResponse) => {
        console.log(response);
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
    this.incomeCharts = data.income.map(it => {
      return {
        seriesName: 'Kelish, m³/s',
        color: 'rgba(37, 99, 235,0.4)',
        data: it.data.reverse().map(e => ({timestamp: new Date(e.date).getTime(), value: e.value}))
      }
    })

    this.releaseCharts = data.release.map(it => {
      return {
        seriesName: 'Chiqish, m³/s',
        color: 'rgba(225, 29, 72,0.4)',
        data: it.data.reverse().map(e => ({timestamp: new Date(e.date).getTime(), value: e.value}))
      }
    })

    this.levelCharts = data.level.map(it => {
      return {
        seriesName: 'Sath, m',
        color: 'rgba(22, 163, 74,0.4)',
        data: it.data.reverse().map(e => ({timestamp: new Date(e.date).getTime(), value: e.value}))
      }
    })

    this.volumeCharts = data.volume.map(it => {
      return {
        seriesName: 'Hajm, mln.m³',
        color: 'rgba(147, 51, 234,0.4)',
        data: it.data.reverse().map(e => ({timestamp: new Date(e.date).getTime(), value: e.value}))
      }
    })
  }
}
