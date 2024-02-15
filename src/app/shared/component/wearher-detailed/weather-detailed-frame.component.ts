import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {WeatherApiService} from "../../../service/weather-api.service";
import {WeatherService} from "../../../service/weather.service";
import {ReservoirResponse} from "../../response/reservoir-response";
import {WeatherCurrentDto, WeatherCurrentResponse} from "../../response/weather-response";

@Component({
  selector: 'app-weather-detailed',
  templateUrl: './weather-detailed-frame.component.html',
  styleUrl: './weather-detailed-frame.component.css'
})
export class WeatherDetailedFrameComponent implements OnChanges {
  @Input() reservoir?: ReservoirResponse
  reservoirName?: string
  weatherCurrent?: WeatherCurrentDto
  weatherHourly: WeatherCurrentDto[] = []
  weatherDaily: {
    date: Date
    dayIcon?: string
    nightIcon?: string
    dayIconDescription?: string
    nightIconDescription?: string
    dayTemperature?: number
    nightTemperature?: number
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
      next: (response: WeatherCurrentResponse) => {
          this.weatherCurrent = this.weatherService.convertCurrentResponse(response)
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
              } else if (weather.time.getHours() === 17) {
                existsElement.nightIcon = weather.weatherIcon
                existsElement.nightIconDescription = weather.windDirection
                existsElement.nightTemperature = weather.temp
              }
            }
          }
        }
        this.weatherDaily = this.weatherDaily.slice(0,4)
      }
    })
  }

}
