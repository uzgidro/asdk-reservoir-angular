import {Component, OnInit} from '@angular/core';
import {CardHeaderComponent} from "../shared/component/card-header/card-header.component";
import {NgChartsModule} from "ng2-charts";
import {RouterLink} from "@angular/router";
import {ChartConfiguration, ChartType, Plugin} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {NgForOf} from "@angular/common";
import {ApiService} from "../service/api.service";
import {CategorisedArrayResponse} from "../shared/response/values-response";

@Component({
  selector: 'app-water-recourses',
  standalone: true,
  imports: [
    CardHeaderComponent,
    NgChartsModule,
    RouterLink,
    NgForOf
  ],
  templateUrl: './water-recourses.component.html',
  styleUrl: './water-recourses.component.css'
})
export class WaterRecoursesComponent implements OnInit {
  public reservoirs = ['Ohangaron', 'Andijon', 'Hisorak', 'To\'palang', 'Chorbog', 'Sardoba']
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
      }
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    aspectRatio: 2.5,
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
  public chartPlugin = [ChartDataLabels] as Plugin<'bar'>[];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getDashboardValues().subscribe({
      next: (response: CategorisedArrayResponse) => {

      }
    })
  }
}
