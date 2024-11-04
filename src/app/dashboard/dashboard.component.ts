import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgChartsModule} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartOptions, ChartType, Plugin} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels'
import {CarouselModule} from "primeng/carousel";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    RouterLink,
    NgChartsModule,
    CarouselModule,
    NgOptimizedImage,
  ],
  standalone: true
})
export class DashboardComponent {
  public reservoirs = ['Ohangaron', 'Andijon', 'Hisorak', 'To\'palang', 'Chorog', 'Sardoba']
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'white',
        }
      },
      y: {
        min: 10,
        grid: {
          color: '#2D2D2D',
        },
        ticks: {
          color: 'white',
        }
      },

    },
    plugins: {
      tooltip: {
        enabled: false
      },
      legend: {
        display: true,
        labels: {
          color: 'white',
        }
      },
      datalabels: {
        color: 'white',
        align: "end",
        anchor: "end"
      }
    },
  };
  public barChartType = 'bar' as const;
  public chartPlugin = [ChartDataLabels] as Plugin<'bar'>[];

  public barChartData: ChartData<'bar'> = {
    labels: this.reservoirs,
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55],
        label: '06:00',
        backgroundColor: '#014a67',
        barThickness: 24,
      },
      {
        data: [28, 48, 40, 19, 86, 27],
        label: '12:00',
        backgroundColor: '#4eeefe',
        barThickness: 24,
      },
    ],
  };

  public chartData: ChartData<'bar'> = {
    labels: this.reservoirs,
    datasets: [
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
    ],
  };

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

}
