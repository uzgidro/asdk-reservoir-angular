import {Component, OnInit} from '@angular/core';
import {CardHeaderComponent} from "../shared/component/card-header/card-header.component";
import {NgForOf} from "@angular/common";
import {ApiService} from "../service/api.service";
import {WeatherApiService} from "../service/weather-api.service";
import {ComplexValueResponse} from "../shared/response/values-response";
import {WaterRecourseCardComponent} from "./water-recourse-card/water-recourse-card.component";
import {DateChart} from "../shared/struct/chart";
import {CardWrapperComponent} from "../shared/component/card-wrapper/card-wrapper.component";

@Component({
    selector: 'app-water-recourses',
    imports: [
        CardHeaderComponent,
        NgForOf,
        WaterRecourseCardComponent,
        CardWrapperComponent
    ],
    templateUrl: './water-recourses.component.html',
  styleUrl: './water-recourses.component.css',
  standalone: true,
})
export class WaterRecoursesComponent implements OnInit {
  reservoirData: {
    reservoirId: number;
    reservoir: string
    income: number
    incomeDifference: string
    incomeChart: DateChart
    release: number
    releaseDifference: string
    releaseChart: DateChart
    level: number
    levelDifference: string
    levelChart: DateChart
    volume: number
    volumeDifference: string
    volumeChart: DateChart
    incomeLabels: string[]
    releaseLabels: string[]
    levelLabels: string[]
    volumeLabels: string[]
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
          item.income.data.map(it => new Date(it.date).getTime())

          this.reservoirData.push({
            reservoirId: item.reservoir.id,
            reservoir: item.reservoir.name,
            income: item.income.data[0].value,
            incomeDifference: this.getDifference(item.income),
            incomeChart: {
              seriesName: 'Kelish',
              data: item.income.data.map(it => ({
                timestamp: Date.parse(it.date),
                value: it.value
              })).reverse(),
            },
            release: item.release.data[0].value,
            releaseDifference: this.getDifference(item.release),
            releaseChart: {
              seriesName: 'Chiqish',
              data: item.release.data.map(it => ({
                timestamp: Date.parse(it.date),
                value: it.value
              })).reverse(),
            },
            volume: item.volume.data[0].value,
            volumeDifference: this.getDifference(item.volume),
            volumeChart: {
              seriesName: 'Hajm',
              data: item.volume.data.map(it => ({
                timestamp: Date.parse(it.date),
                value: it.value
              })).reverse(),
            },
            level: item.level.data[0].value,
            levelDifference: this.getDifference(item.level),
            levelChart: {
              seriesName: 'Sath',
              data: item.level.data.map(it => ({
                timestamp: Date.parse(it.date),
                value: it.value
              })).reverse(),
            },
            incomeLabels: item.income.data.map(value => value.date.split(' ')[1].substring(0, 5)).reverse(),
            releaseLabels: item.release.data.map(value => value.date.split(' ')[1].substring(0, 5)).reverse(),
            levelLabels: item.level.data.map(value => value.date.split(' ')[1].substring(0, 5)).reverse(),
            volumeLabels: item.volume.data.map(value => value.date.split(' ')[1].substring(0, 5)).reverse(),
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
