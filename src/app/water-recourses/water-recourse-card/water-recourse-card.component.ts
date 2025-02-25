import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DecimalPipe, NgClass, NgIf, TitleCasePipe} from "@angular/common";
import {NgChartsModule} from "ng2-charts";
import {RouterLink} from "@angular/router";
import {UzbWeatherPipe} from "../../shared/pipe/uzb-weather.pipe";
import {Chart} from "../../shared/component/chart";
import {DateChart} from "../../shared/struct/chart";

@Component({
  selector: 'app-water-recourse-card',
  standalone: true,
  imports: [
    DecimalPipe,
    NgChartsModule,
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
  implements OnInit, AfterViewInit {
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
  id!: string;

  public category: 'income' | 'release' | 'volume' | 'level' = 'income'

  ngOnInit() {
    this.id = Math.floor(new Date().getTime() * Math.random()).toString();
  }

  ngAfterViewInit() {
    this.renderHourChart(this.id, [this.data.incomeChart])
  }

  changeCategory(category: 'income' | 'release' | 'volume' | 'level') {
    this.category = category

    switch (this.category) {
      case 'income': {
        this.updateHourChart(this.data.incomeChart)
        break
      }
      case 'release': {
        this.updateHourChart(this.data.releaseChart)
        break
      }
      case 'level': {
        this.updateHourChart(this.data.levelChart)
        break
      }
      case 'volume': {
        this.updateHourChart(this.data.volumeChart)
        break
      }
    }
  }
}
