import {Component, Input} from '@angular/core';
import {DecimalPipe, NgClass, NgIf, TitleCasePipe} from "@angular/common";
import {NgChartsModule} from "ng2-charts";
import {RouterLink} from "@angular/router";
import {UzbWeatherPipe} from "../../shared/pipe/uzb-weather.pipe";
import {ChartConfiguration, ChartType, Plugin} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
export class WaterRecourseCardComponent {
  @Input() data?: {
    reservoirId: number;
    reservoir: string
    income: number
    incomeDifference: string
    incomeChart: any
    release: number
    releaseDifference: string
    releaseChart: any
    level: number
    levelDifference: string
    levelChart: any
    volume: number
    volumeDifference: string
    volumeChart: any
    labels: string[]
    weather?: string
    temperature?: string
    windSpeed?: number
    humidity?: string
  }

  get dataset() {
    switch (this.category) {
      case "income":
        return this.data?.incomeChart
      case "release":
        return this.data?.releaseChart
      case "level":
        return this.data?.levelChart
      case "volume":
        return this.data?.volumeChart
    }
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    interaction: {mode: 'index', intersect: false},
    aspectRatio: 2.5,
    scales: {
      x: {
        grid: {
          color: '#2D2D2D',
        },
        ticks: {
          color: 'white',
        }
      },
      y: {
        grid: {
          color: '#2D2D2D',
        },
        ticks: {
          color: 'white',
        }
      },
    },

    plugins: {
      legend: {
        display: true, labels: {
          color: 'white',
          font: {
            size: 16,
          },
        }
      },
      datalabels: {
        color: "#FFF",
        align: "top",
        anchor: "start",
      }
    },
  };

  public lineChartType: ChartType = 'line';
  public chartPlugin = [ChartDataLabels] as Plugin[];
  public category: 'income' | 'release' | 'volume' | 'level' = 'income'

  changeCategory(category: 'income' | 'release' | 'volume' | 'level') {
    console.log('lel')
    this.category = category
  }
}
