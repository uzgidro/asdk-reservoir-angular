import {Component, Input, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-charts-temp',
  templateUrl: './charts-temp.component.html',
  styleUrls: ['./charts-temp.component.css']
})
export class ChartsTempComponent implements OnInit {

  waterChart?: Chart
  filterChart?: Chart
  volumeChart?: Chart
  pressureChart?: Chart
  @Input() showPressure: boolean = false

  ngOnInit() {
    Chart.register(...registerables)
    this.drawChart()
  }

  drawChart() {
    // destroy shown charts
    if (this.waterChart !== undefined) {
      this.waterChart.destroy()
    }
    if (this.filterChart !== undefined) {
      this.filterChart.destroy()
    }
    if (this.volumeChart !== undefined) {
      this.volumeChart.destroy()
    }
    if (this.pressureChart !== undefined) {
      this.pressureChart.destroy()
    }
    // draw charts
    this.waterChart = new Chart('ReportChart', {
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
        aspectRatio: 1,
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

    this.filterChart = new Chart('FilterChart', {
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
        aspectRatio: 1,
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

    this.volumeChart = new Chart('VolumeChart', {
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
        aspectRatio: 1,
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
        aspectRatio: 1,
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
