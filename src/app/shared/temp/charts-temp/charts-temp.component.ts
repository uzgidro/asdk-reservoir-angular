import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Chart} from "chart.js";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-charts-temp',
    templateUrl: './charts-temp.component.html',
    styleUrls: ['./charts-temp.component.css'],
    imports: [
        NgClass
    ],
  standalone: true,
})
export class ChartsTempComponent implements OnInit {

  activePowerChart?: Chart
  reactivePowerChart?: Chart
  waterReleaseChart?: Chart
  pressureChart?: Chart
  @Input() showPressure: boolean = false

  screenWidth?: number


  constructor() {
    this.screenWidth = window.innerWidth
  }

  ngOnInit() {
    this.drawChart()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = (event.target as Window).innerWidth
    this.drawChart()
  }

  drawChart() {
    // destroy shown charts
    if (this.activePowerChart !== undefined) {
      this.activePowerChart.destroy()
    }
    if (this.reactivePowerChart !== undefined) {
      this.reactivePowerChart.destroy()
    }
    if (this.waterReleaseChart !== undefined) {
      this.waterReleaseChart.destroy()
    }
    if (this.pressureChart !== undefined) {
      this.pressureChart.destroy()
    }
    // draw charts
    this.activePowerChart = new Chart('ActivePowerChart', {
      type: 'line',
      data: {
        labels: ['01.2023', '02.2023', '03.2023', '04.2023', '05.2023', '06.2023', '07.2023', '08.2023', '09.2023'],
        datasets: [
          {
            label: "Активная мощность",
            data: [1234, 1234, 3456, 4567, 5678, 5789, 6123, 6123, 5234],
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        animation: false,
        aspectRatio: this.screenWidth!! <= 1280 ? 2.5 : 1,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'КВт',
            }
          }
        }
      }
    })

    this.reactivePowerChart = new Chart('ReactivePowerChart', {
      type: 'line',
      data: {
        labels: ['01.2023', '02.2023', '03.2023', '04.2023', '05.2023', '06.2023', '07.2023', '08.2023', '09.2023'],
        datasets: [
          {
            label: "Реактивная мощность",
            data: [1232, 2342, 3452, 5678, 6789, 4589, 4567, 3456, 3412],
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        animation: false,
        aspectRatio: this.screenWidth!! <= 1280 ? 2.5 : 1,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'КВАр',
            }
          }
        }
      }
    })

    this.waterReleaseChart = new Chart('WaterReleaseChart', {
      type: 'line',
      data: {
        labels: ['01.2023', '02.2023', '03.2023', '04.2023', '05.2023', '06.2023', '07.2023', '08.2023', '09.2023'],
        datasets: [
          {
            label: "Суммарный расход через турбину",
            data: [567, 569, 623, 689, 612, 534, 645, 656, 545],
            borderColor: 'gray',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        animation: false,
        aspectRatio: this.screenWidth!! <= 1280 ? 2.5 : 1,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'м3',
            }
          }
        }
      }
    })

    this.pressureChart = new Chart('PressureChart', {
      type: 'line',
      data: {
        labels: ['01.2023', '02.2023', '03.2023', '04.2023', '05.2023', '06.2023', '07.2023', '08.2023', '09.2023'],
        datasets: [
          {
            label: "Нетто напор",
            data: [1.5, 1.7, 2, 1.6, 1.4, 1.5, 1.5, 1.3, 1.7],
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            fill: true,
          }
        ]
      },
      options: {
        animation: false,
        aspectRatio: this.screenWidth!! <= 1280 ? 2.5 : 1,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          y: {
            min: 1,
            max: 2.2,
            title: {
              display: true,
              text: 'м',
            }
          }
        }
      }
    })
  }
}
