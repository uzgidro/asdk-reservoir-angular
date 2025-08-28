import {AfterViewInit, Component, Input} from '@angular/core';
import {DecimalPipe, NgClass, NgIf, TitleCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {UzbWeatherPipe} from "../../shared/pipe/uzb-weather.pipe";
import {Chart} from "../../shared/component/chart";
import {DateChart} from "../../shared/struct/chart";

@Component({
    selector: 'app-water-recourse-card',
    imports: [
        DecimalPipe,
        NgIf,
        RouterLink,
        TitleCasePipe,
        UzbWeatherPipe,
        NgClass
    ],
    templateUrl: './water-recourse-card.component.html',
    styleUrl: './water-recourse-card.component.css'
})
export class WaterRecourseCardComponent
  extends Chart
  implements AfterViewInit {
  @Input() data!: {
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
  }

  public category: 'income' | 'release' | 'volume' | 'level' = 'income'

  ngAfterViewInit() {
    this.renderDateChart([this.data.incomeChart])
  }

  changeCategory(category: 'income' | 'release' | 'volume' | 'level') {
    this.category = category

    switch (this.category) {
      case 'income': {
        this.updateDateChart([this.data.incomeChart])
        break
      }
      case 'release': {
        this.updateDateChart([this.data.releaseChart])
        break
      }
      case 'level': {
        this.updateDateChart([this.data.levelChart])
        break
      }
      case 'volume': {
        this.updateDateChart([this.data.volumeChart])
        break
      }
    }
  }
}
