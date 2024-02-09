import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart, ChartConfiguration, ChartType, registerables} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {EnvService} from "../../shared/service/env.service";
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {CategorisedValueResponse, ComplexValueResponse} from "../../shared/response/values-response";
import {MenuItem} from "../../shared/interfaces";

@Component({
  selector: 'app-reservoir-dashboard',
  templateUrl: './reservoir-dashboard.component.html',
  styleUrls: ['./reservoir-dashboard.component.css']
})
export class ReservoirDashboardComponent implements OnInit {
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  chartData: { id: number, name: string, data: number[] }[] = []
  chartTimeline: string[] = []
  charts: { data: ChartConfiguration['data'], options: ChartConfiguration['options'], id: number }[] = []

  reservoirsData: {
    id: number,
    name: string,
    release?: {latest: number, difference: number},
    level?: {latest: number, difference: number},
    volume?: {latest: number, difference: number}
  }[] = []

  constructor(private env: EnvService, private api: ApiService, private router: Router) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.getData()
  }

  navigateToReservoirCurrent(id: number) {
    this.router.navigate(['/reservoir/water/current'], {
      queryParams: {reservoir: id}
    })
  }

  navigateToReservoirWeather(id: string) {
    this.router.navigate(['/reservoir/weather'], {
      queryParams: {reservoir: id}
    })
  }

  private getData() {
    this.api.getDashboardValues().subscribe({
      next: (response: CategorisedValueResponse) => {

        this.setupIncome(response)
        this.setupReservoirsData(response)
      }
    })
  }

  private setupIncome(response: CategorisedValueResponse) {
    for (let item of response.income) {
      this.chartData.push({id: item.reservoir_id, name: item.reservoir, data: item.data.map(value => value.value)})
    }
    if (this.chartData.length > 0) {
      this.setupChartTimeline()
      this.setupChart()
    }
  }

  private setupReservoirsData(response: CategorisedValueResponse) {
    for (let item of response.release) {
      this.reservoirsData.push({
        id: item.reservoir_id,
        name: item.reservoir,
        release: {
          latest: item.data[item.data.length - 1].value,
          difference: item.data[item.data.length - 1].value - item.data[item.data.length - 2].value
        }
      })
    }
    for (let item of response.level) {
      let data =
        this.reservoirsData.find(value => value.id === item.reservoir_id)
      if (data) {
        data.level = {
          latest: item.data[item.data.length - 1].value,
          difference: item.data[item.data.length - 1].value - item.data[item.data.length - 2].value
        }
      }
    }
    for (let item of response.volume) {
      let data =
        this.reservoirsData.find(value => value.id === item.reservoir_id)
      if (data) {
        data.volume = {
          latest: item.data[item.data.length - 1].value,
          difference: item.data[item.data.length - 1].value - item.data[item.data.length - 2].value
        }
      }
    }
    console.log(this.reservoirsData)
  }

  // nested functions
  private setupChart() {
    for (let data of this.chartData) {
      this.charts.push({
        id: data.id,
        data: {
          datasets: [
            {
              data: data.data,
              label: 'Приток, м3/с',
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
              text: data.name
            }
          }
        }
      })
    }
  }

  private setupChartTimeline() {
    let now: number
    if (new Date().getHours() % 2 === 0) {
      now = new Date().getHours()
    } else {
      now = new Date().getHours() - 1
    }
    let start = 0
    let counter = 2
    while (true) {

      this.chartTimeline.push((now + counter) < 10 ? '0' + (now + counter) + ':00' : (now + counter) + ':00')
      if (now + counter == 22)
        break
      counter += 2
    }
    while (start <= now) {
      this.chartTimeline.push(start < 10 ? '0' + start + ':00' : start + ':00')
      start += 2
    }
  }
}

