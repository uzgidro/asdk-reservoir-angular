import {Component, OnInit} from '@angular/core';
import {NgChartsModule} from "ng2-charts";
import {ChartConfiguration, ChartOptions, ChartType, Plugin} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels'
import {CarouselModule} from "primeng/carousel";
import {CardHeaderComponent} from "../shared/component/card-header/card-header.component";
import {DashboardCurrentChartComponent} from "./dashboard-current-chart/dashboard-current-chart.component";
import {ApiService} from "../service/api.service";
import {ReservoirResponse} from "../shared/response/reservoir-response";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    NgChartsModule,
    CarouselModule,
    CardHeaderComponent,
    DashboardCurrentChartComponent,

  ],
  standalone: true
})
export class DashboardComponent implements OnInit {
  // public reservoirs?: string[]
  public reservoirs: string[] = []
  public chartPlugin = [ChartDataLabels] as Plugin<'bar'>[];

  public barChartType = 'bar' as const;

  public chartData = [
      {
        label: 'Current Value',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#4eeefe',
        barThickness: 24,
      },
      {
        label: '100% Background',
        data: [100, 100, 100, 100, 100, 100],
        backgroundColor: '#014a67',
        barThickness: 24,
        datalabels: {
          display: false
        }
      },
  ]

  public chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y', // Горизонтальный бар
    maintainAspectRatio: false,
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

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Series B',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
      },
      {
        data: [180, 480, 770, 90, 1000, 270, 400],
        label: 'Series C',
        yAxisID: 'y1',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
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
      legend: {display: true},
    },
  };

  public lineChartType: ChartType = 'line';

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getReservoirs().subscribe({
      next: (response: ReservoirResponse[]) => {
        this.reservoirs = response.map(value => value.name)
      }
    })
  }
}
