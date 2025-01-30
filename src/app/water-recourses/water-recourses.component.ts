import {Component, OnInit} from '@angular/core';
import {CardHeaderComponent} from "../shared/component/card-header/card-header.component";
import {NgChartsModule} from "ng2-charts";
import {NgForOf} from "@angular/common";
import {ApiService} from "../service/api.service";
import {WeatherApiService} from "../service/weather-api.service";
import {ComplexValueResponse} from "../shared/response/values-response";
import {WaterRecourseCardComponent} from "./water-recourse-card/water-recourse-card.component";
import {ReservoirData} from "../shared/interface/reservoir-data";
import {ResourceService} from "../service/resource.service";

@Component({
  selector: 'app-water-recourses',
  standalone: true,
  imports: [
    CardHeaderComponent,
    NgChartsModule,
    NgForOf,
    WaterRecourseCardComponent
  ],
  templateUrl: './water-recourses.component.html',
  styleUrl: './water-recourses.component.css'
})
export class WaterRecoursesComponent implements OnInit {
  reservoirData: ReservoirData[] = []

  constructor(private apiService: ApiService, private weatherApiService: WeatherApiService, private resourceService: ResourceService) {
  }

  ngOnInit() {
    this.apiService.getDashboardValuesSortedByReservoir().subscribe({
      next: response => {
        response.forEach(item => {
          this.reservoirData.push(this.resourceService.parseResponse(item))
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


}
