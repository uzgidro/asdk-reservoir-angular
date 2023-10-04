import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  waterChart?: Chart
  filterChart?: Chart
  volumeChart?: Chart

  ngOnInit() {
    Chart.register(...registerables)
    this.drawChart()
  }

  tabclick(event: any, city: string) {
    let tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    (event.currentTarget as HTMLElement).className += " active";

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
            label: "Приток воды, м3",
            data: [1234, 1234, 3456, 4567, 5678, 5789, 6123, 6123, 5234],
            backgroundColor: 'blue',
            borderColor: 'blue',
            tension: 0.4
          },
          {
            label: "Попуск воды, м3",
            data: [1232, 2342, 3452, 5678, 6789, 4589, 4567, 3456, 3412],
            backgroundColor: 'red',
            borderColor: 'red',
            tension: 0.4
          }
        ]
      },
      options: {
        aspectRatio: 1,
      }
    })

    this.filterChart = new Chart('FilterChart', {
      type: 'line',
      data: {
        labels: ['01.2023', '02.2023', '03.2023', '04.2023', '05.2023', '06.2023', '07.2023', '08.2023', '09.2023'],
        datasets: [
          {
            label: "Отфильтровано воды, м3",
            data: [45, 23, 89, 90, 64, 74, 38, 86, 57],
            backgroundColor: 'green',
            borderColor: 'green',
            tension: 0.4
          }
        ]
      },
      options: {
        aspectRatio: 1
      }
    })

    this.volumeChart = new Chart('VolumeChart', {
      type: 'line',
      data: {
        labels: ['01.2023', '02.2023', '03.2023', '04.2023', '05.2023', '06.2023', '07.2023', '08.2023', '09.2023'],
        datasets: [
          {
            label: "Объем воды, млн м3",
            data: [567, 569, 623, 689, 612, 534, 645, 656, 545],
            backgroundColor: 'gray',
            borderColor: 'gray',
            tension: 0.4
          }
        ]
      },
      options: {
        aspectRatio: 1
      }
    })
  }
}
