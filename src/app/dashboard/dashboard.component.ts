import {Component, OnInit} from '@angular/core';
import {NgChartsModule} from "ng2-charts";
import {ChartConfiguration, ChartOptions, ChartType, Plugin} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels'
import {CarouselModule} from "primeng/carousel";
import {CardHeaderComponent} from "../shared/component/card-header/card-header.component";
import {DashboardCurrentChartComponent} from "./dashboard-current-chart/dashboard-current-chart.component";
import {ApiService} from "../service/api.service";
import {ReservoirResponse} from "../shared/response/reservoir-response";
import {Forecast, WeatherCurrentResponse} from "../shared/response/weather-response";
import {WeatherService} from "../service/weather.service";
import {WeatherApiService} from "../service/weather-api.service";
import {NgOptimizedImage} from "@angular/common";
import {EnvService} from "../shared/service/env.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    NgChartsModule,
    CarouselModule,
    CardHeaderComponent,
    DashboardCurrentChartComponent,
    NgOptimizedImage,
    RouterLink,

  ],
  standalone: true
})
export class DashboardComponent implements OnInit {
  public reservoirs: string[] = []
  public modsnowReservoirs: string[] = []
  public chartPlugin = [ChartDataLabels] as Plugin<'bar'>[];

  public barChartType = 'bar' as const;

  public chartData = [
    {
      label: 'Current Value',
      data: [90, 97, 98, 97, 83, 96],
      backgroundColor: '#4eeefe',
      barThickness: 24,
    },
    {
      label: '100% Background',
      data: [100, 100, 100, 100, 100, 100],
      backgroundColor: '#014a67',
      barThickness: 24,
      datalabels: {
        display: false
      }
    },
  ]

  public chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y', // Горизонтальный бар
    maintainAspectRatio: false,
    plugins: {
      legend: {display: false},
      tooltip: {
        enabled: false, // Включить только для верхнего слоя
      },
      datalabels: {
        color: "#014a67",
        align: "start",
        anchor: "end",
      }
    },
    scales: {
      x: {
        max: 100,
        // stacked: true,
        ticks: {
          color: 'white',
        }
      }, // Устанавливаем максимум шкалы на 100%
      y: {
        stacked: true,
        ticks: {
          color: 'white',
        },
      }
    },
  };

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
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Series B',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
      },
      {
        data: [180, 480, 770, 90, 1000, 270, 400],
        label: 'Series C',
        yAxisID: 'y1',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
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

  public weatherDaily: {
    reservoir: string
    forecast?: Forecast[]
  }[] = []

  get forecastDate() {
    if (this.weatherDaily.length > 0) {
    return this.weatherDaily[0].forecast?.map(value => value.date)
    }
    return undefined
  }

  constructor(private apiService: ApiService, private weatherApiService: WeatherApiService, private weatherService: WeatherService,private env: EnvService) {
  }

  ngOnInit() {
    this.apiService.getReservoirs().subscribe({
      next: (response: ReservoirResponse[]) => {
        this.reservoirs = response.map(value => value.name)

        this.setWeather(response)
      }
    })
    this.env.getRegions().filter(item => item.snowCoverage !== undefined).forEach(reservoir => {
      this.modsnowReservoirs.push(reservoir.name)
    })
  }

  private setWeather(reservoirs: ReservoirResponse[]) {
    reservoirs.forEach(reservoir => {
      let forecast: Forecast[] = []
      this.weatherApiService.getForecast(reservoir.lat, reservoir.lon).subscribe({
        next: (response) => {
          for (let res of response.list as WeatherCurrentResponse[]) {
            const weather = this.weatherService.convertCurrentResponse(res)
            if (weather.time.getDate() !== new Date().getDate()) {
              let existsElement = forecast.find(item => item.date.getDate() === weather.time.getDate())
              if (!existsElement) {
                forecast.push({date: weather.time})
              } else {

                if (weather.time.getHours() === 11) {
                  existsElement.dayIcon = weather.weatherIcon
                  existsElement.dayIconDescription = weather.weatherDescription
                  existsElement.dayTemperature = weather.temp
                } else if (weather.time.getHours() === 17) {
                  existsElement.nightIcon = weather.weatherIcon
                  existsElement.nightIconDescription = weather.windDirection
                  existsElement.nightTemperature = weather.temp
                }
              }
            }
          }
        },
        complete: () => {
          this.weatherDaily.push({reservoir: reservoir.name, forecast: forecast.slice(0, 4)})
        }
      })
    })
  }
}
