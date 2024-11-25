import {Component, OnInit} from '@angular/core';
import {CardHeaderComponent} from "../shared/component/card-header/card-header.component";
import {NgChartsModule} from "ng2-charts";
import {RouterLink} from "@angular/router";
import {ChartConfiguration, ChartType, Plugin} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {DecimalPipe, NgClass, NgForOf, TitleCasePipe} from "@angular/common";
import {ApiService} from "../service/api.service";
import {WeatherApiService} from "../service/weather-api.service";
import {ComplexValueResponse} from "../shared/response/values-response";
import {UzbWeatherPipe} from "../shared/pipe/uzb-weather.pipe";

@Component({
  selector: 'app-water-recourses',
  standalone: true,
  imports: [
    CardHeaderComponent,
    NgChartsModule,
    RouterLink,
    NgForOf,
    DecimalPipe,
    NgClass,
    UzbWeatherPipe,
    TitleCasePipe
  ],
  templateUrl: './water-recourses.component.html',
  styleUrl: './water-recourses.component.css'
})
export class WaterRecoursesComponent implements OnInit {
  public reservoirs = ['Ohangaron', 'Andijon', 'Hisorak', 'To\'palang', 'Chorbog', 'Sardoba']

  public lineChartOptions: ChartConfiguration['options'] = {
    interaction: {mode: 'index', intersect: false},
    aspectRatio: 2.5,
    scales: {
      x: {
        grid: {
          color: '#2D2D2D',
        },
        ticks: {
          color: 'white',
        }
      },
      y: {
        grid: {
          color: '#2D2D2D',
        },
        ticks: {
          color: 'white',
        }
      },
    },

    plugins: {
      legend: {display: true},
      datalabels: {
        color: "#FFF",
        align: "top",
        anchor: "start",
      }
    },
  };

  public lineChartType: ChartType = 'line';
  public chartPlugin = [ChartDataLabels] as Plugin[];

  reservoirData: {
    reservoirId: number;
    reservoir: string
    income: number
    incomeDifference: string
    incomeChart: any
    release: number
    releaseDifference: string
    releaseChart: any
    level: number
    levelDifference: string
    levelChart: any
    volume: number
    volumeDifference: string
    volumeChart: any
    labels: string[]
    weather?: string
    temperature?: string
    windSpeed?: number
    humidity?: string
  }[] = []

  constructor(private apiService: ApiService, private weatherApiService: WeatherApiService) {
  }

  ngOnInit() {
    this.apiService.getDashboardValuesSortedByReservoir().subscribe({
      next: response => {
        response.forEach(item => {
          this.reservoirData.push({
            reservoirId: item.reservoir.id,
            reservoir: item.reservoir.name,
            income: item.income.data[0].value,
            incomeDifference: this.getDifference(item.income),
            incomeChart: [{
              data: item.income.data.map(value => value.value),
              label: 'Kelish',
              borderColor: 'rgba(148,159,177,1)',
              pointBackgroundColor: 'rgba(148,159,177,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            }],
            release: item.release.data[0].value,
            releaseDifference: this.getDifference(item.release),
            releaseChart: [{
              data: item.release.data.map(value => value.value),
              label: 'Chiqish',
              borderColor: 'rgba(148,159,177,1)',
              pointBackgroundColor: 'rgba(148,159,177,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            }],
            volume: item.volume.data[0].value,
            volumeDifference: this.getDifference(item.volume),
            volumeChart: [{
              data: item.volume.data.map(value => value.value),
              label: 'Hajm',
              borderColor: 'rgba(148,159,177,1)',
              pointBackgroundColor: 'rgba(148,159,177,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            }],
            level: item.level.data[0].value,
            levelDifference: this.getDifference(item.level),
            levelChart: [{
              data: item.level.data.map(value => value.value),
              label: 'Sath',
              borderColor: 'rgba(148,159,177,1)',
              pointBackgroundColor: 'rgba(148,159,177,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            }],
            labels: item.income.data.map(value => value.date.split(' ')[1].substring(0, 5))
          })
          this.weatherApiService.getCurrent(item.reservoir.lat, item.reservoir.lon).subscribe({
            next: response => {
              let index = this.reservoirData.findIndex(value => value.reservoir == item.reservoir.name);
              if (index >= 0) {
                this.reservoirData[index].weather = response.weatherDescription
                this.reservoirData[index].humidity = response.humidity
                this.reservoirData[index].windSpeed = response.windSpeed
                this.reservoirData[index].temperature = response.temp
              }
            }
          })
        })
      }
    })
  }

  private getDifference(data: ComplexValueResponse) {
    const diff = data.data[0].value - data.data[1].value;
    return (diff > 0 ? '+' : '') + (diff % 1 === 0 ? diff.toString() : diff.toFixed(2))
  }
}
