import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ReservoirResponse} from "../../response/reservoir-response";
import {WeatherApiService} from "../../../service/weather-api.service";
import {WeatherCurrentDto, WeatherCurrentResponse} from "../../response/weather-response";
import {WeatherService} from "../../../service/weather.service";

@Component({
  selector: 'app-weather-frame',
  templateUrl: './weather-frame.component.html',
  styleUrl: './weather-frame.component.css'
})
export class WeatherFrameComponent implements OnChanges {
  @Input() reservoir?: ReservoirResponse
  reservoirName?: string
  weather?: WeatherCurrentDto

  constructor(private weatherApiService: WeatherApiService, private weatherService: WeatherService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    const res = changes['reservoir'].currentValue as ReservoirResponse
    this.reservoirName = res.name
    const lat = res.lat
    const lon = res.lon
    // this.weatherApiService.getCurrent(lat, lon).subscribe({
    //   next: (response: WeatherCurrentResponse) => {
    //     this.weather = this.weatherService.convertCurrentResponse(response)
    //   }
    // })
  }
}
