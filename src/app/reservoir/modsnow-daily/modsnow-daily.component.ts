import {Component, OnInit, ViewChild} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {EnvService} from "../../shared/service/env.service";
import {BaseChartDirective, NgChartsModule} from "ng2-charts";
import {ChartConfiguration} from "chart.js";

@Component({
  selector: 'app-modsnow-daily',
  standalone: true,
  imports: [
    CarouselModule,
    TagModule,
    ButtonModule,
    NgOptimizedImage,
    CalendarModule,
    FormsModule,
    NgChartsModule
  ],
  templateUrl: './modsnow-daily.component.html',
  styleUrl: './modsnow-daily.component.css'
})
export class ModsnowDailyComponent implements OnInit {
  reservoirs: {
    id: string
    name: string
    chartData: ChartConfiguration['data']
  }[] = [];
  responsiveOptions: any[] = []

  public lineChartOptions: ChartConfiguration['options'] = {
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
      legend: {display: true},
      title: {
        display: true,
        text: 'Покрытие снегом на высоте в %'
      }
    }
  }
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private env: EnvService) {
  }

  ngOnInit() {
    this.setupData()

    this.responsiveOptions = [
      {
        breakpoint: '1499px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '1091px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  setupData() {
    this.env.getRegions().filter(item => item.snowCoverage !== undefined).forEach(reservoir => {
      let height: number[] = []
      let heightValue = 1000
      reservoir.snowCoverage!.forEach(() => {
        height.push(heightValue)
        heightValue += 500
      })
      this.reservoirs.push({
        id: reservoir.id,
        name: reservoir.name,
        chartData: {
          datasets: [
            {
              data: reservoir.snowCoverage!,
              label: `Покрытие снегом, %`,
              backgroundColor: 'rgba(37, 99, 235,0.2)',
              borderColor: 'rgba(37, 99, 235,1)',
              pointBackgroundColor: '#fff',
              pointBorderColor: 'rgba(37, 99, 235,1)',
              pointHoverBackgroundColor: 'rgba(37, 99, 235,0.2)',
              pointHoverBorderColor: '#fff',
              fill: 'origin'
            },
          ],
          labels: height,
        }
      })
    })
  }
}
