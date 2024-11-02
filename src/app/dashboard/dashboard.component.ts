import {Component, ViewChild} from '@angular/core';
import {RouterLink} from "@angular/router";
import {BaseChartDirective, NgChartsModule} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartOptions, Plugin} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    RouterLink,
    NgChartsModule,
  ],
  standalone: true
})
export class DashboardComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

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
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'],
    datasets: [
      {data: [65, 59, 80, 81, 56, 55, 40, 90, 84], label: '06:00', backgroundColor: '#014a67'},
      {data: [28, 48, 40, 19, 86, 27, 90, 64, 54], label: '12:00', backgroundColor: '#4eeefe'},
    ],
  };

  public chartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'],
    datasets: [
      {
        label: 'Current Value',
        data: [65, 59, 80, 81, 56, 55, 40, 90, 84],
        backgroundColor: 'rgba(0, 123, 255, 1)',
        barThickness: 30,
      },
      {
        label: '100% Background',
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100],
        backgroundColor: 'rgba(0, 123, 255, 0.3)',
        hoverBackgroundColor: 'rgba(0, 123, 255, 0.3)',
        barThickness: 30,
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
        color: "white",
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
}
