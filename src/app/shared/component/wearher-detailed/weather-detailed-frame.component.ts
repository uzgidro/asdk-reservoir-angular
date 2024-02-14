import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DatePipe, DecimalPipe, NgForOf} from "@angular/common";
import {RusDatePipe} from "../../pipe/rus-date.pipe";
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
    day: Date,
    humidityIcon: 'humidity_high' | 'humidity_mid' | 'humidity_low',
    humidity: number,
    dayIcon: 'sunny' | 'cloud' | 'partly_cloudy_day' | 'cloudy_snowing' | 'rainy' | 'nights_stay' | 'clear_night',
    nightIcon: 'sunny' | 'cloud' | 'partly_cloudy_day' | 'cloudy_snowing' | 'rainy' | 'nights_stay' | 'clear_night',
    dayTemperature: number,
    nightTemperature: number
  }[] = []

  constructor(private weatherApiService: WeatherApiService, private weatherService: WeatherService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    const res = changes['reservoir'].currentValue as ReservoirResponse
    this.reservoirName = res.name
    const lat = res.lat
    const lon = res.lon
    this.weatherApiService.getForecast(lat, lon).subscribe({
      next: (response) => {
        console.log(response)
        for (let weather of response.list.slice(0,6)) {
        this.weatherHourly.push(this.weatherService.convertCurrentResponse(weather))
        }
      }
    })
  }

}
