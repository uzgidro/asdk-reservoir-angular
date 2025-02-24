import {AfterViewInit, Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {ModsnowService} from "../../service/modsnow.service";
import {NgChartsModule} from "ng2-charts";
import {RouterLink} from "@angular/router";
import {Chart} from "../../shared/component/chart";
import {CategoryChart} from "../../shared/struct/chart";

@Component({
  selector: 'app-dashboard-snow-chart',
  standalone: true,
  imports: [
    NgChartsModule,
    RouterLink
  ],
  templateUrl: './dashboard-snow-char.component.html',
  styleUrl: './dashboard-snow-char.component.css'
})
export class DashboardSnowChartComponent
  extends Chart
  implements OnInit, AfterViewInit, OnDestroy {
  id!: string;

  constructor(private modsnow: ModsnowService,
              @Inject(PLATFORM_ID) platformId: Object,
              zone: NgZone) {
    super(platformId, zone)
  }

  ngOnInit() {
    this.id = Math.floor(new Date().getTime() * Math.random()).toString()
  }

  ngAfterViewInit() {
    this.modsnow.getPercent().subscribe(response => {
        const data: CategoryChart[] = response.map((value) => ({
          name: value.name,
          data: [{
            value: value.percent,
            seriesName: '%',
            color: '#4eeefe',
            bulletColor: '#014a67',
          }]
        }))
        this.renderCategoryChart(this.id, data, false)
      }
    )
  }

  ngOnDestroy() {
    this.chartDispose()
  }
}
