import {AfterViewInit, Component, Inject, NgZone, PLATFORM_ID} from '@angular/core';
import {NgChartsModule} from "ng2-charts";
import {RouterLink} from "@angular/router";
import {Chart} from "../../shared/component/chart";
import {CategoryChart} from "../../shared/struct/chart";
import {ApiService} from "../../service/api.service";

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
  implements AfterViewInit {

  constructor(private apiService: ApiService,
              @Inject(PLATFORM_ID) platformId: Object,
              zone: NgZone) {
    super(platformId, zone)
  }

  ngAfterViewInit() {
    this.apiService.getModsnow().subscribe({
      next: response => {
        const data: CategoryChart[] = response.map(value => ({
          name: value.name,
          data: [{
            value: value.current_percent,
            seriesName: 'Qor qo\'plama, %',
            color: '#4eeefe',
          }]
        }))
        this.renderVerticalCategoryChart(data);
      }
    })

  }
}
