import {Component, OnInit} from '@angular/core';
import {CardHeaderComponent} from "../shared/component/card-header/card-header.component";
import {NgChartsModule} from "ng2-charts";
import {RouterLink} from "@angular/router";
import {ChartConfiguration, ChartType, Plugin} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {NgForOf} from "@angular/common";
import {ApiService} from "../service/api.service";
import {WeatherApiService} from "../service/weather-api.service";

@Component({
  selector: 'app-water-recourses',
  standalone: true,
  imports: [
    CardHeaderComponent,
    NgChartsModule,
    RouterLink,
    NgForOf
  ],
  templateUrl: './water-recourses.component.html',
  styleUrl: './water-recourses.component.css'
})
export class WaterRecoursesComponent implements OnInit {
  public reservoirs = ['Ohangaron', 'Andijon', 'Hisorak', 'To\'palang', 'Chorbog', 'Sardoba']
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      }
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
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
    },
  };

  public lineChartType: ChartType = 'line';
  public chartPlugin = [ChartDataLabels] as Plugin<'bar'>[];

  reservoirData: {
    reservoir: string
    income: number
    incomeDifference: string
    incomeChart: {
      data: number[],
      label: 'Kelish',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    }
    release: number
    releaseDifference: string
    releaseChart: {
      data: number[],
      label: 'Chiqish',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    }
    level: number
    levelDifference: string
    levelChart: {
      data: number[],
      label: 'Sath',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    }
    volume: number
    volumeDifference: string
    volumeChart: {
      data: number[],
      label: 'Hajm',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    }
    labels: string[]
    weather: string
    temperature: string
    windSpeed: number
    humidity: string
  }[] = []

  constructor(private apiService: ApiService, private weatherApiService: WeatherApiService) {
  }

  ngOnInit() {
    this.apiService.getDashboardValuesSortedByReservoir().subscribe({
      next: response => {
        let weather = ''
        let temperature = ''
        let windSpeed = -1
        let humidity = ''
        response.forEach(item => {
          this.weatherApiService.getCurrent(item.reservoir.lat, item.reservoir.lon).subscribe({
            next: response => {
              weather = response.weatherDescription
              temperature = response.temp
              windSpeed = response.windSpeed
              humidity = response.humidity
            },
            complete: () => {
              this.reservoirData.push({
                reservoir: item.reservoir.name,
                income: item.income.data[0].value,
                incomeDifference: (((item.income.data[0].value - item.income.data[1].value) > 0 ? '+' : '')) + (item.income.data[0].value - item.income.data[1].value).toString(),
                incomeChart: {
                  data: item.income.data.map(value => value.value),
                  label: 'Kelish',
                  borderColor: 'rgba(148,159,177,1)',
                  pointBackgroundColor: 'rgba(148,159,177,1)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                },
                release: item.release.data[0].value,
                releaseDifference: (((item.release.data[0].value - item.release.data[1].value) > 0 ? '+' : '')) + (item.release.data[0].value - item.release.data[1].value).toString(),
                releaseChart: {
                  data: item.release.data.map(value => value.value),
                  label: 'Chiqish',
                  borderColor: 'rgba(148,159,177,1)',
                  pointBackgroundColor: 'rgba(148,159,177,1)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                },
                volume: item.volume.data[0].value,
                volumeDifference: (((item.volume.data[0].value - item.volume.data[1].value) > 0 ? '+' : '')) + (item.volume.data[0].value - item.volume.data[1].value).toString(),
                volumeChart: {
                  data: item.volume.data.map(value => value.value),
                  label: 'Hajm',
                  borderColor: 'rgba(148,159,177,1)',
                  pointBackgroundColor: 'rgba(148,159,177,1)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                },
                level: item.level.data[0].value,
                levelDifference: (((item.level.data[0].value - item.level.data[1].value) > 0 ? '+' : '')) + (item.level.data[0].value - item.level.data[1].value).toString(),
                levelChart: {
                  data: item.level.data.map(value => value.value),
                  label: 'Sath',
                  borderColor: 'rgba(148,159,177,1)',
                  pointBackgroundColor: 'rgba(148,159,177,1)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                },
                labels: item.income.data.map(value => value.date),
                weather: weather,
                humidity: humidity,
                windSpeed: windSpeed,
                temperature: temperature
              })
            }
          })
        })
        console.log(this.reservoirData)
      }
    })
  }
}
