import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {NgChartsModule} from "ng2-charts";
import {ApiService} from "../../service/api.service";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {WeatherDetailedFrameComponent} from "../../shared/component/wearher-detailed/weather-detailed-frame.component";
import {WaterRecourseCardComponent} from "../../water-recourses/water-recourse-card/water-recourse-card.component";
import {ReservoirData} from "../../shared/interface/reservoir-data";
import {ResourceService} from "../../service/resource.service";
import {ModsnowService} from "../../service/modsnow.service";
import {ChartConfiguration, ChartType, Plugin} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

@Component({
  selector: 'app-custom-dashboard',
  standalone: true,
  imports: [
    CardHeaderComponent,
    NgChartsModule,
    WeatherDetailedFrameComponent,
    WaterRecourseCardComponent
  ],
  templateUrl: './custom-dashboard.component.html',
  styleUrl: './custom-dashboard.component.css'
})
export class CustomDashboardComponent implements OnInit {
  exactReservoir: '' | 'hisorak' = '';
  reservoir?: ReservoirResponse;
  reservoirData?: ReservoirData;
  modsnowLabels: string[] = [];
  modsnowDatasets: any

  lineChartOptions: ChartConfiguration['options'] = {
    interaction: {mode: 'index', intersect: false},
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
        },
        max: 100
      },
    },

    plugins: {
      legend: {
        display: true, labels: {
          color: 'white',
          font: {
            size: 16,
          },
        }
      },
      datalabels: {
        color: "#FFF",
        align: "top",
        anchor: "start",
      }
    },
  };
  lineChartType: ChartType = 'line';
  chartPlugin = [ChartDataLabels] as Plugin[];


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private modsnowService: ModsnowService,
    private resourceService: ResourceService) {
  }

  ngOnInit() {
    let urlParam = this.activatedRoute.parent?.snapshot.paramMap.get('reservoir');
    if (urlParam != undefined) {
      if (urlParam == 'hisorak') {
        this.exactReservoir = urlParam
      } else {
        this.router.navigate(['']);
      }
    }

    this.api.getDashboardValuesSortedByReservoir().subscribe(array => {
      let find = array.find(value => value.reservoir.name.toLowerCase() == this.exactReservoir.toLowerCase());
      if (find) {
        this.reservoirData = this.resourceService.parseResponse(find);
      }
    });

    this.api.getReservoirs().subscribe({
      next: (response: ReservoirResponse[]) => {
        this.reservoir = response.find(value => value.name.toLowerCase() === this.exactReservoir.toLowerCase());
      }
    })

    this.modsnowService.getYearsComparation(this.exactReservoir).subscribe(response => {
      this.modsnowLabels = response.labels
      this.modsnowDatasets = [
        {
          data: response.previous,
          label: '2024',
          borderColor: 'rgba(37, 99, 235,0.4)',
          pointBackgroundColor: 'rgba(37, 99, 235,0.5)',
          pointBorderColor: 'rgba(37, 99, 235,0.4)',
          pointHoverBackgroundColor: 'rgba(37, 99, 235,0.2)',
          pointHoverBorderColor: '#fff',
        },
        {
          data: response.current,
          label: '2025',
          borderColor: 'rgba(22, 163, 74,0.4)',
          pointBackgroundColor: 'rgba(22, 163, 74,0.5)',
          pointBorderColor: 'rgba(22, 163, 74,0.4)',
          pointHoverBackgroundColor: 'rgba(22, 163, 74,0.8)',
          pointHoverBorderColor: '#fff',
        }
      ]
    });
  }
}
