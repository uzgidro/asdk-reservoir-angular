import {Component} from '@angular/core';
import {CardHeaderComponent} from "../shared/component/card-header/card-header.component";
import {NgChartsModule} from "ng2-charts";
import {RouterLink} from "@angular/router";
import {ChartConfiguration, ChartData, Plugin} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

@Component({
  selector: 'app-water-recourses',
  standalone: true,
  imports: [
    CardHeaderComponent,
    NgChartsModule,
    RouterLink
  ],
  templateUrl: './water-recourses.component.html',
  styleUrl: './water-recourses.component.css'
})
export class WaterRecoursesComponent {
  public reservoirs = ['Ohangaron', 'Andijon', 'Hisorak', 'To\'palang', 'Chorog', 'Sardoba']
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    aspectRatio: 2.5,
    // maintainAspectRatio: false,
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
        barThickness: 36,
      },
      {
        data: [28, 48, 40, 19, 86, 27],
        label: '12:00',
        backgroundColor: '#4eeefe',
        barThickness: 36,
      },
    ],
  };
}
