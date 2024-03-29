// noinspection JSIgnoredPromiseFromCall

import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart, ChartConfiguration, ChartType, registerables} from "chart.js";
import {BaseChartDirective, NgChartsModule} from "ng2-charts";
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {CategorisedArrayResponse} from "../../shared/response/values-response";
import {ReservoirService} from "../reservoir.service";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {NgForOf, NgIf} from "@angular/common";
import {ReservoirCurrentComponent} from "../../shared/component/reservoir-current/reservoir-current.component";
import {WeatherFrameComponent} from "../../shared/component/weather/weather-frame.component";
import {LoaderComponent} from "../../shared/component/loader/loader.component";

@Component({
  selector: 'app-reservoir-dashboard',
  templateUrl: './reservoir-dashboard.component.html',
  styleUrls: ['./reservoir-dashboard.component.css'],
  imports: [
    NgIf,
    NgForOf,
    NgChartsModule,
    ReservoirCurrentComponent,
    WeatherFrameComponent,
    LoaderComponent
  ],
  standalone: true
})
export class ReservoirDashboardComponent implements OnInit {
  reservoirs: ReservoirResponse[] = []

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  chartData: { id: number, name: string, data: number[] }[] = []
  chartTimeline: string[] = []
  charts: { data: ChartConfiguration['data'], options: ChartConfiguration['options'], id: number }[] = []

  reservoirsData: {
    id: number,
    name: string,
    release?: { latest: number, difference: number },
    level?: { latest: number, difference: number },
    volume?: { latest: number, difference: number }
  }[] = []

  constructor(private api: ApiService, private reservoirService: ReservoirService, private router: Router) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.setupReservoirs()
    this.getData()
  }

  navigateToReservoirCurrent(id: number) {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/reservoir/water/current'], {
      queryParams: {reservoir: id}
    })
  }

  navigateToReservoirWeather(id: number) {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/reservoir/weather'], {
      queryParams: {reservoir: id}
    })
  }

  private setupReservoirs() {
    this.api.getReservoirs().subscribe({
      next: (response: ReservoirResponse[]) => {
        this.reservoirs = response
      }
    })
  }

  private getData() {
    this.api.getDashboardValues().subscribe({
      next: (response: CategorisedArrayResponse) => {
        this.setupIncome(response)
        this.setupReservoirsData(response)
      }
    })
  }

  private setupIncome(response: CategorisedArrayResponse) {
    for (let item of response.income) {
      this.chartData.push({id: item.reservoir_id, name: item.reservoir, data: item.data.map(value => value.value)})
    }
    if (this.chartData.length > 0) {
      this.chartTimeline = this.reservoirService.setupChartTimeline()
      this.setupChart()
    }
  }

  private setupReservoirsData(response: CategorisedArrayResponse) {
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


}

