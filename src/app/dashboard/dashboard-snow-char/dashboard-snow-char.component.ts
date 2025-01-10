import {Component, OnInit} from '@angular/core';
import {ModsnowService} from "../../service/modsnow.service";
import {ChartOptions, Plugin} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {NgChartsModule} from "ng2-charts";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard-snow-chart',
  standalone: true,
  imports: [
    NgChartsModule,
    RouterLink
  ],
  templateUrl: './dashboard-snow-char.component.html',
  styleUrl: './dashboard-snow-char.component.css'
})
export class DashboardSnowChartComponent implements OnInit {

  public labels: string[] = [];

  public data: any[] = [];

  public type = 'bar' as const;

  public plugin = [ChartDataLabels] as Plugin<'bar'>[];

  public options: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y', // Горизонтальный бар
    maintainAspectRatio: true,
    plugins: {
      legend: {display: false},
      tooltip: {
        enabled: false, // Включить только для верхнего слоя
      },
      datalabels: {
        color: "#014a67",
        align: "start",
        anchor: "end",
      }
    },
    scales: {
      x: {
        max: 100,
        // stacked: true,
        ticks: {
          color: 'white',
        }
      }, // Устанавливаем максимум шкалы на 100%
      y: {
        stacked: true,
        ticks: {
          color: 'white',
        },
      }
    },
  };

  constructor(private modsnow: ModsnowService) {
  }

  ngOnInit() {
    this.modsnow.getPercent().subscribe(response => {
        console.log(response)

        this.labels = response.map(value => value.name)
        this.data = [
          {
            label: 'Current Value',
            data: response.map(value => value.percent),
            backgroundColor: '#4eeefe',
            barThickness: 24,
          },
          {
            label: '100% Background',
            data: response.map(() => 100),
            backgroundColor: '#014a67',
            barThickness: 24,
            datalabels: {
              display: false
            }
          }
        ]
      }
    )
  }
}
