import {Component, OnInit} from '@angular/core';
import {ChartConfiguration} from "chart.js";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservoirService} from "../reservoir.service";
import {ApiService} from "../../service/api.service";
import {
  CategorisedArrayResponse,
  CategorisedValueResponse,
  ComplexValueResponse
} from "../../shared/response/values-response";
import {ReservoirResponse} from "../../shared/response/reservoir-response";

@Component({
  selector: 'app-reservoir-hourly',
  templateUrl: './reservoir-hourly.component.html',
  styleUrls: ['./reservoir-hourly.component.css'],
  // imports: [
  //   NgIf,
  //   AppModule,
  //   NgChartsModule,
  //   NgForOf,
  //   DatePipe,
  //   DecimalPipe,
  //   LoaderComponent
  // ],
  // standalone: true

})
export class ReservoirHourlyComponent implements OnInit {
  selectedDate = new Date()
  times: Date[] = []
  chartTimeline: string[] = []
  reservoir?: ReservoirResponse
  charts: { data: ChartConfiguration['data'], options: ChartConfiguration['options'] }[] = []

  reservoirsData: {
    id: number,
    name: string,
    income?: number[],
    release?: { latest: number, old: number },
    level?: { latest: number, old: number },
    volume?: { latest: number, old: number }
  }[] = []

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private reservoirService: ReservoirService,
    private api: ApiService
  ) {
  }

  async ngOnInit() {
    this.setInfoTime()

    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.api.getReservoirById(value['reservoir']).subscribe({
          next: (response: ReservoirResponse) => {
            this.reservoir = response
          }
        })
        this.api.getCurrentReservoirValues(value['reservoir']).subscribe({
          next: (response: CategorisedValueResponse) => {
            if (this.charts.length !== 0) {
              this.charts = []
              this.chartTimeline = []
            }
            this.chartTimeline = this.reservoirService.setupChartTimeline()
            this.setupChart(response.income)
            this.setupChart(response.release)
            this.setupChart(response.level)
            this.setupChart(response.volume)
          }
        })
      }
    })
    this.api.getDashboardValues().subscribe({
      next: (response: CategorisedArrayResponse) => {
        this.setupTable(response)
      }
    })
  }

  navigateToReservoirWeather(id: number) {
    this.router.navigate(['/reservoir/weather'], {
      queryParams: {reservoir: id}
    })
  }

  navigateToReservoir(id: number) {
    this.router.navigate([], {
      queryParams: {reservoir: id}
    })
  }

  private setupChart(values: ComplexValueResponse) {
    let label
    if (values.category === 'income') {
      label = 'Приток, м3/с'
    } else if (values.category === 'release') {
      label = 'Попуск, м3/с'
    } else if (values.category === 'level') {
      label = 'Уровень, м'
    } else if (values.category === 'volume') {
      label = 'Объём, млн. м3'
    } else {
      return
    }
    this.charts.push({
      data: {
        datasets: [
          {
            data: values.data.map(item => item.value),
            label: label,
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgb(59, 130, 246)',
            pointBorderColor: '#fff',
            pointHoverBorderColor: 'white',
            pointBackgroundColor: 'rgb(59, 130, 246)'
          }
        ],
        labels: this.chartTimeline,
      },
      options: {
        elements: {
          line: {
            tension: 0.5,
          },
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {display: false},
          title: {
            display: true,
            position: "top",
            align: "center",
            text: label
          }
        }
      }
    })
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
        data.income = item.data.map(value => value.value).slice(-4)
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
