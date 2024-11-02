import {Component, ViewChild} from '@angular/core';
import {RouterLink} from "@angular/router";
import {BaseChartDirective, NgChartsModule} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, Plugin} from "chart.js";
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

  // events
  public chartClicked({
                        event,
                        active,
                      }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
                        event,
                        active,
                      }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }
}
