import {AfterViewInit, Component, Inject, NgZone, PLATFORM_ID} from '@angular/core';
import {NgChartsModule} from "ng2-charts";
import {RouterLink} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {CategorisedArrayResponse, ComplexValueResponse} from "../../shared/response/values-response";
import {NgClass} from "@angular/common";
import {Chart} from "../../shared/component/chart";
import {CategoryChart} from "../../shared/struct/chart";

@Component({
  selector: 'app-dashboard-current-chart',
  standalone: true,
  imports: [
    NgChartsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './dashboard-current-chart.component.html',
  styleUrl: './dashboard-current-chart.component.css'
})
export class DashboardCurrentChartComponent
  extends Chart
  implements AfterViewInit {
  category: 'income' | 'release' | 'volume' | 'level' = 'income';

  private incomeData!: CategoryChart[]
  private releaseData!: CategoryChart[]
  private volumeData!: CategoryChart[]
  private levelData!: CategoryChart[]

  constructor(@Inject(PLATFORM_ID) platformId: Object, zone: NgZone, private apiService: ApiService) {
    super(platformId, zone)
  }

  ngAfterViewInit() {
    this.apiService.getDashboardValues().subscribe({
      next: (response: CategorisedArrayResponse) => {
        this.incomeData = this.setupData(response.income)
        this.releaseData = this.setupData(response.release)
        this.levelData = this.setupData(response.level)
        this.volumeData = this.setupData(response.volume)
        this.renderCategoryChart(this.incomeData)
      }
    })
  }

  public changeCategory(category: 'income' | 'release' | 'volume' | 'level'): void {
    this.category = category
    switch (category) {
      case "income": {
        this.updateCategoryChart(this.incomeData)
        break
      }
      case "release": {
        this.updateCategoryChart(this.releaseData)
        break
      }
      case "level": {
        this.updateCategoryChart(this.levelData)
        break
      }
      case "volume": {
        this.updateCategoryChart(this.volumeData)
        break
      }
    }
  }

  private setupData(data: ComplexValueResponse[]) {
    let chartData: CategoryChart[] = data.map(it => {
      let count = 0;
      let filter = it.data.filter((value, index) => {
        if ((index === 0 || value.date.includes('06:00:00')) && count < 2) {
          count++;
          return true;
        }
        return false;
      });

      return {
        name: it.reservoir,
        data: filter.map((inner, index) => {
          return {
            seriesName: new Intl.DateTimeFormat('eu-EU', {hour: 'numeric'}).format(new Date(inner.date)) + ':00',
            value: Number.parseFloat((Math.round(inner.value * 10) / 10).toFixed(1)),
            color: index == 0 ? '#4eeefe' : '#014a67',
            bulletColor: index == 0 ? '#014a67' : '#4eeefe',
          }
        })
      }
    })
    return chartData;
  }
}
