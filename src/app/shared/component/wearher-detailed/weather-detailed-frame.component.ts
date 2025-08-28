import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {WeatherApiService} from "../../../service/weather-api.service";
import {WeatherService} from "../../../service/weather.service";
import {ReservoirResponse} from "../../response/reservoir-response";
import {WeatherCurrentDto, WeatherCurrentResponse} from "../../response/weather-response";
import {DatePipe, DecimalPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {LoaderComponent} from "../loader/loader.component";
import {UzbDatePipePipe} from "../../pipe/uzb-date-pipe.pipe";
import {CardHeaderComponent} from "../card-header/card-header.component";
import {CardWrapperComponent} from "../card-wrapper/card-wrapper.component";

@Component({
    selector: 'app-weather-detailed',
    templateUrl: './weather-detailed-frame.component.html',
    styleUrl: './weather-detailed-frame.component.css',
    imports: [
        NgIf,
        NgOptimizedImage,
        DecimalPipe,
        DatePipe,
        NgForOf,
        LoaderComponent,
        UzbDatePipePipe,
        CardHeaderComponent,
        CardWrapperComponent
    ]
})
export class WeatherDetailedFrameComponent implements OnChanges {
  @Input() reservoir?: ReservoirResponse
  @Input() displayTitle: boolean = true
  reservoirName?: string
  weatherCurrent?: WeatherCurrentDto
  weatherHourly: WeatherCurrentDto[] = []
  weatherDaily: {
    date: Date
    dayIcon?: string
    nightIcon?: string
    dayIconDescription?: string
    nightIconDescription?: string
    dayTemperature?: string
    nightTemperature?: string
  }[] = []

  constructor(private weatherApiService: WeatherApiService, private weatherService: WeatherService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.weatherHourly = []
    const res = changes['reservoir'].currentValue as ReservoirResponse
    this.reservoirName = res.name
    const lat = res.lat
    const lon = res.lon
    this.weatherApiService.getCurrent(lat, lon).subscribe({
      next: response => {
        this.weatherCurrent = response
      }
    })
    this.weatherApiService.getForecast(lat, lon).subscribe({
      next: (response) => {
        for (let weather of response.list.slice(0, 7)) {
          this.weatherHourly.push(this.weatherService.convertCurrentResponse(weather))
        }
        for (let res of response.list as WeatherCurrentResponse[]) {
          const weather = this.weatherService.convertCurrentResponse(res)
          if (weather.time.getDate() !== new Date().getDate()) {
            let existsElement = this.weatherDaily.find(item => item.date.getDate() === weather.time.getDate())
            if (!existsElement) {
              this.weatherDaily.push({date: weather.time})
            } else {
              if (weather.time.getHours() === 11) {
                existsElement.dayIcon = weather.weatherIcon
                existsElement.dayIconDescription = weather.weatherDescription
                existsElement.dayTemperature = weather.temp
              } else if (weather.time.getHours() === 23) {
                existsElement.nightIcon = weather.weatherIcon
                existsElement.nightIconDescription = weather.windDirection
                existsElement.nightTemperature = weather.temp
              }
            }
          }
        }
        this.weatherDaily = this.weatherDaily.slice(0, 4)
      }
    })
  }

}
