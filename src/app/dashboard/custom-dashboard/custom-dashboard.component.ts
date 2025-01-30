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
  filterLabels: string[] = [];
  filterDatasets: any;

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
  doubleChartOptions: ChartConfiguration['options'] = {
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
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: '#6A6A6A',
        },
        ticks: {
          color: 'white',
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
          color: '#2D2D2D',
        },
        ticks: {
          color: 'white',
        },
      }
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
        rotation: 315,
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

    this.filterLabels = [
      '01-01',
      '02-01',
      '03-01',
      '04-01',
      '05-01',
      '06-01',
      '07-01',
      '08-01',
      '09-01',
      '10-01',
      '11-01',
      '12-01',
      '13-01',
      '14-01',
      '15-01',
      '16-01',
      '17-01',
      '18-01',
      '19-01',
      '20-01',
      '21-01',
      '22-01',
      '23-01',
      '24-01',
      '25-01',
      '26-01',
      '27-01',
      '28-01',
      '29-01',
      '30-01',
    ]

    this.filterDatasets = [
      {
        data: [1077.68,
          1077.87,
          1078.07,
          1078.26,
          1078.46,
          1078.65,
          1078.83,
          1079.00,
          1079.16,
          1079.33,
          1079.50,
          1079.69,
          1079.87,
          1080.05,
          1080.23,
          1080.39,
          1080.53,
          1080.70,
          1080.88,
          1081.04,
          1081.20,
          1081.37,
          1081.49,
          1081.61,
          1081.73,
          1081.85,
          1081.97,
          1082.09,
          1082.18,
          1082.30,
        ],
        label: 'Suv sathi, m',
        borderColor: 'rgba(22, 163, 74,0.4)',
        pointBackgroundColor: 'rgba(22, 163, 74,0.5)',
        pointBorderColor: 'rgba(22, 163, 74,0.4)',
        pointHoverBackgroundColor: 'rgba(22, 163, 74,0.8)',
        pointHoverBorderColor: '#fff',
        yAxisID: 'y1'
      },
      {
        data: [31.14,
          31.36,
          31.36,
          31.36,
          31.80,
          32.41,
          32.64,
          32.64,
          32.64,
          32.68,
          32.68,
          32.68,
          32.68,
          32.68,
          32.91,
          32.91,
          32.91,
          32.91,
          32.99,
          33.20,
          33.20,
          33.45,
          33.97,
          33.97,
          34.38,
          34.38,
          34.38,
          34.38,
        ],
        label: '2025, l/s',
        borderColor: 'rgba(37, 99, 235,0.4)',
        pointBackgroundColor: 'rgba(37, 99, 235,0.5)',
        pointBorderColor: 'rgba(37, 99, 235,0.4)',
        pointHoverBackgroundColor: 'rgba(37, 99, 235,0.2)',
        pointHoverBorderColor: '#fff',
        yAxisID: 'y'
      },
      {
        data: [34.58,
          31.63,
          32.11,
          32.36,
          32.61,
          32.84,
          32.84,
          32.89,
          32.94,
          32.94,
          33.20,
          33.43,
          33.43,
          33.43,
          33.60,
          33.60,
          34.28,
          34.28,
          34.28,
          34.71,
          34.71,
          34.71,
          35.26,
          35.26,
          35.26,
          35.26,
          36.05,
          36.05,
        ],
        label: '2025, l/s',
        borderColor: 'rgba(225, 29, 72,0.4)',
        pointBackgroundColor: 'rgba(225, 29, 72,0.5)',
        pointBorderColor: 'rgba(225, 29, 72,0.4)',
        pointHoverBackgroundColor: 'rgba(225, 29, 72,0.8)',
        pointHoverBorderColor: '#fff',
        yAxisID: 'y'
      },
      {
        data: [34.30,
          34.67,
          34.97,
          34.97,
          34.60,
          35.64,
          35.81,
          35.81,
          36.34,
          36.34,
          37.20,
          37.20,
          37.68,
          37.81,
          38.25,
          38.25,
          38.25,
          36.79,
          36.79,
          37.06,
          37.06,
          37.06,
          37.06,
          37.34,
          37.34,
          37.34,
          37.71,
          39.42,
        ],
        label: '23, l/s',
        borderColor: 'rgba(217, 119, 6,0.4)',
        pointBackgroundColor: 'rgba(217, 119, 6,0.5)',
        pointBorderColor: 'rgba(217, 119, 6,0.4)',
        pointHoverBackgroundColor: 'rgba(217, 119, 6,0.2)',
        pointHoverBorderColor: '#fff',
        yAxisID: 'y'
      },
      {
        data: [108.90,
          109.10,
          109.30,
          109.30,
          109.50,
          109.60,
          109.80,
          110.05,
          110.15,
          110.30,
          110.60,
          110.70,
          110.85,
          111.20,
          111.50,
          111.75,
          112.10,
          112.20,
          112.45,
          112.75,
          112.90,
          112.95,
          113.25,
          113.40,
          113.70,
          114.00,
          114.15,
          114.45,
        ],
        label: 'Me\'yor, l/s',
        borderColor: 'rgba(147, 51, 234,0.4)',
        pointBackgroundColor: 'rgba(147, 51, 234,0.5)',
        pointBorderColor: 'rgba(147, 51, 234,0.4)',
        pointHoverBackgroundColor: 'rgba(147, 51, 234,0.2)',
        pointHoverBorderColor: '#fff',
        yAxisID: 'y'
      },
    ]

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
