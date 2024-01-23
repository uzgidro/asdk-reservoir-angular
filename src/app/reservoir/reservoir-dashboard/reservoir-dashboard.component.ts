import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart, ChartConfiguration, ChartType, registerables} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {EnvService} from "../../shared/service/env.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reservoir-dashboard',
  templateUrl: './reservoir-dashboard.component.html',
  styleUrls: ['./reservoir-dashboard.component.css']
})
export class ReservoirDashboardComponent implements OnInit {
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  reservoirs = this.env.getRegions()
  data: { data: ChartConfiguration['data'], options: ChartConfiguration['options'], id: string }[] = []

  constructor(private env: EnvService, private router: Router) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    let count = 0
    for (const res of this.env.getRegions()) {
      this.data[count++] = {
        id: res.id,
        data: {
          datasets: [
            {
              data: res.waterIncome,
              label: 'Приток, м3/с',
              backgroundColor: 'rgba(148,159,177,0.2)',
              borderColor: 'rgb(59, 130, 246)',
              pointBorderColor: '#fff',
              pointHoverBorderColor: 'white',
              pointBackgroundColor: 'rgb(59, 130, 246)'
            }
          ],
          labels: this.env.getDataLabels(),
        },
        options: {
          elements: {
            line: {
              tension: 0.5,
            },
          },
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {display: false},
            title: {
              display: true,
              position: "top",
              align: "center",
              text: res.name
            }
          }
        }
      }
    }
  }

  navigateToReservoirCurrent(id: string) {
    this.router.navigate(['/reservoir/water/current'], {
      queryParams: {reservoir: id}
    })
  }

  navigateToReservoirWeather(id: string) {
    this.router.navigate(['/reservoir/weather'], {
      queryParams: {reservoir: id}
    })
  }

  // public lineChartData: ChartConfiguration['data'] = {
  //   datasets: [
  //     {
  //       data: [65, 59, 80, 81, 56, 55, 40],
  //       label: 'Приток, м3/с',
  //       backgroundColor: 'rgba(148,159,177,0.2)',
  //       borderColor: 'rgba(148,159,177,1)',
  //       pointBorderColor: '#fff',
  //       pointHoverBorderColor: 'rgba(148,159,177,0.8)',
  //     }
  //   ],
  //   labels: this.dataLabels,
  // };

  public lineChartOptions: ChartConfiguration['options']
}

