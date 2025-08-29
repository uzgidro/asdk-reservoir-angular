import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {CategorisedArrayResponse} from "../../shared/response/values-response";
import {DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {LoaderComponent} from "../../shared/component/loader/loader.component";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {ChartComponent} from "./chart/chart.component";
import {DateChart} from "../../shared/struct/chart";
import {OperativeTableComponent} from "./operative-table/operative-table.component";
import {CardWrapperComponent} from "../../shared/component/card-wrapper/card-wrapper.component";
import {DifferencePipe} from "../../shared/pipe/difference.pipe";

@Component({
    selector: 'app-reservoir-hourly',
    templateUrl: './reservoir-hourly.component.html',
    styleUrls: ['./reservoir-hourly.component.css'],
    imports: [
        NgForOf,
        NgIf,
        DatePipe,
        DecimalPipe,
        LoaderComponent,
        CardHeaderComponent,
        ChartComponent,
        OperativeTableComponent,
        CardWrapperComponent,
        DifferencePipe
    ],
  standalone: true,
})
export class ReservoirHourlyComponent implements OnInit {
  selectedDate = new Date()
  times: Date[] = []

  reservoirsData: {
    id: number,
    name: string,
    income?: number[],
    release?: { latest: number, old: number },
    level?: { latest: number, old: number },
    volume?: { latest: number, old: number }
  }[] = []

  selectedReservoir: number = 0

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {
  }

  async ngOnInit() {
    this.setInfoTime()
    this.api.getDashboardValues().subscribe({
      next: (response: CategorisedArrayResponse) => {
        this.setupTable(response)
        this.setupChartData(response)
      }
    })


    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.selectedReservoir = parseInt(value['reservoir'])
      }
    })
  }

  navigateToReservoir(id: number) {
    this.router.navigate([], {
      queryParams: {reservoir: id}
    })
  }

  private setupChartData(data: CategorisedArrayResponse) {
    for (let i = 0; i < data.income.length; i++) {
      this.incomeCharts.push({
        data: data.income[i].data.reverse().map(e => ({timestamp: new Date(e.date).getTime(), value: e.value})),
        seriesName: 'Kelish, m³/s',
        color: 'rgba(37, 99, 235,0.4)',
      })
      this.releaseCharts.push({
        data: data.release[i].data.reverse().map(e => ({timestamp: new Date(e.date).getTime(), value: e.value})),
        seriesName: 'Chiqish, m³/s',
        color: 'rgba(225, 29, 72,0.4)',
      })
      this.levelCharts.push({
        data: data.level[i].data.reverse().map(e => ({timestamp: new Date(e.date).getTime(), value: e.value})),
        seriesName: 'Sath, m',
        color: 'rgba(22, 163, 74,0.4)',
      })
      this.volumeCharts.push({
        data: data.volume[i].data.reverse().map(e => ({timestamp: new Date(e.date).getTime(), value: e.value})),
        seriesName: 'Hajm, mln.m³',
        color: 'rgba(147, 51, 234,0.4)',
      })
    }
  }

  private setupTable(response: CategorisedArrayResponse) {
    for (let item of response.release) {
      this.reservoirsData.push({
        id: item.reservoir_id,
        name: item.reservoir,
        release: {
          latest: item.data[item.data.length - 1].value,
          old: item.data[item.data.length - 2].value
        }
      })
    }
    for (let item of response.level) {
      let data =
        this.reservoirsData.find(value => value.id === item.reservoir_id)
      if (data) {
        data.level = {
          latest: item.data[item.data.length - 1].value,
          old: item.data[item.data.length - 2].value
        }
      }
    }
    for (let item of response.volume) {
      let data =
        this.reservoirsData.find(value => value.id === item.reservoir_id)
      if (data) {
        data.volume = {
          latest: item.data[item.data.length - 1].value,
          old: item.data[item.data.length - 2].value
        }
      }
    }
    for (let item of response.income) {
      let data =
        this.reservoirsData.find(value => value.id === item.reservoir_id)
      if (data) {
        data.income = item.data.map(value => value.value).slice(-6)
      }
    }
  }

  private setInfoTime() {
    const currentTime = new Date().getHours();
    let currentMonth = new Date().getMonth()
    let currentDate = new Date().getDate()
    let currentYear = new Date().getFullYear()

    let roundedTime: number;

    if (currentTime % 2 == 0) {
      roundedTime = currentTime
    } else {
      roundedTime = currentTime - 1
    }

    for (let i = 0; i <= 5; i++) {
      this.times.push(new Date(currentYear, currentMonth, currentDate, roundedTime))
      roundedTime -= 2
    }
  }
}
