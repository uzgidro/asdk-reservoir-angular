import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-charts-temp',
  templateUrl: './charts-temp.component.html',
  styleUrls: ['./charts-temp.component.css']
})
export class ChartsTempComponent  implements OnInit {

  waterChart?: Chart
  filterChart?: Chart
  volumeChart?: Chart

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
    // draw charts
    this.waterChart = new Chart('ReportChart', {
      type: 'line',
      data: {
        labels: ['01.2023', '02.2023', '03.2023', '04.2023', '05.2023', '06.2023', '07.2023', '08.2023', '09.2023'],
        datasets: [
          {
            label: "Активная мощность, КВт",
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
        }
      }
    })

    this.filterChart = new Chart('FilterChart', {
      type: 'line',
      data: {
        labels: ['01.2023', '02.2023', '03.2023', '04.2023', '05.2023', '06.2023', '07.2023', '08.2023', '09.2023'],
        datasets: [
          {
            label: "Реактивная мощность, КВАр",
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
        }
      }
    })

    this.volumeChart = new Chart('VolumeChart', {
      type: 'line',
      data: {
        labels: ['01.2023', '02.2023', '03.2023', '04.2023', '05.2023', '06.2023', '07.2023', '08.2023', '09.2023'],
        datasets: [
          {
            label: "Холостой сброс, м3",
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
        }
      }
    })
  }
}
