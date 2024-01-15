import {Component, Input, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chart?: Chart

  @Input() labels: string[] = []
  @Input() dataLabel: string = ''
  @Input() data: number[] = []
  @Input() borderColor: string = ''
  @Input() backgroundColor: string = 'rgba(128, 128, 128, 0.2)'
  @Input() title: string = ''
  @Input() id:number = -1


  ngOnInit() {
    Chart.register(...registerables)
    this.drawChart()
  }

  drawChart() {
    // destroy shown charts
    if (this.chart !== undefined) {
      this.chart.destroy()
    }
    // draw charts
    this.chart = new Chart('Chart', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.dataLabel,
            data: this.data,
            borderColor: this.borderColor,
            backgroundColor: 'transparent',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        interaction: {
          mode: 'index',
          intersect: false
        },
        aspectRatio: 1,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            align: "start",
            position: "top",
            text: this.title
          }
        }

      }
    })
  }
}
