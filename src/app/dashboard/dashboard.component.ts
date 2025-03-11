import {Component, OnInit} from '@angular/core';
import {NgChartsModule} from "ng2-charts";
import {CarouselModule} from "primeng/carousel";
import {CardHeaderComponent} from "../shared/component/card-header/card-header.component";
import {DashboardCurrentChartComponent} from "./dashboard-current-chart/dashboard-current-chart.component";
import {ApiService} from "../service/api.service";
import {ReservoirResponse} from "../shared/response/reservoir-response";
import {Forecast, WeatherCurrentResponse} from "../shared/response/weather-response";
import {WeatherService} from "../service/weather.service";
import {WeatherApiService} from "../service/weather-api.service";
import {NgOptimizedImage} from "@angular/common";
import {DashboardSnowChartComponent} from "./dashboard-snow-char/dashboard-snow-char.component";
import {DashboardSnowReviewComponent} from "./dashboard-snow-review/dashboard-snow-review.component";
import {CardWrapperComponent} from "../shared/component/card-wrapper/card-wrapper.component";

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
    DashboardSnowChartComponent,
    DashboardSnowReviewComponent,
    CardWrapperComponent,
  ],
  standalone: true
})
export class DashboardComponent implements OnInit {
  public reservoirs: string[] = []

  public weatherDaily: {
    reservoir: string
    forecast: Forecast[]
  }[] = []

  get forecastDate() {
    if (this.weatherDaily.length > 0) {
      return this.weatherDaily[0].forecast?.map(value => value.date)
    }
    return undefined
  }

  constructor(private apiService: ApiService, private weatherApiService: WeatherApiService, private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.apiService.getReservoirs().subscribe({
      next: (response: ReservoirResponse[]) => {
        this.reservoirs = response.map(value => value.name)

        this.setWeather(response)
      }
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
          this.weatherDaily.push({reservoir: reservoir.name, forecast: forecast.slice(0, 3)})
        }
      })
    })
  }
}
