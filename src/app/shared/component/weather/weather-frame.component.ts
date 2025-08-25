import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ReservoirResponse} from "../../response/reservoir-response";
import {WeatherApiService} from "../../../service/weather-api.service";
import {WeatherCurrentDto} from "../../response/weather-response";
import {DecimalPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {LoaderComponent} from "../loader/loader.component";

@Component({
  selector: 'app-weather-frame',
  templateUrl: './weather-frame.component.html',
  styleUrl: './weather-frame.component.css',
  imports: [
    NgIf,
    NgOptimizedImage,
    DecimalPipe,
    LoaderComponent
  ],
  standalone: true
})
export class WeatherFrameComponent implements OnChanges {
  @Input() reservoir?: ReservoirResponse
  reservoirName?: string
  weather?: WeatherCurrentDto

  constructor(private weatherApiService: WeatherApiService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    const res = changes['reservoir'].currentValue as ReservoirResponse
    this.reservoirName = res.name
    const lat = res.lat
    const lon = res.lon
    this.weatherApiService.getCurrent(lat, lon).subscribe({
      next: response => {
        this.weather = response
      }
    })
  }
}
