import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {ActivatedRoute} from "@angular/router";
import {CategorisedValueResponse} from "../../shared/response/values-response";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {Subscription} from "rxjs";
import {MetricCategory} from "../../shared/enum/metric-category";
import {ReservoirService} from "../reservoir.service";
import {MetricSelectComponent} from "../../shared/component/metric-select/metric-select.component";
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {DecadeService} from "../decade.service";
import {Decade} from "../../shared/interfaces";

@Component({
  selector: 'app-reservoir-yearly',
  templateUrl: './reservoir-yearly.component.html',
  styleUrl: './reservoir-yearly.component.css',
  imports: [
    MetricSelectComponent,
    NgForOf,
    NgClass,
    NgIf,
    DecimalPipe,
    DatePipe
  ],
  standalone: true

})
export class ReservoirYearlyComponent implements OnInit {
  reservoirName?: string
  subscribe?: Subscription
  category: number = 0

  tableData: Decade[] = []
  months: string[] = this.decadeService.months;
  decade: string[] = this.decadeService.decade;


  constructor(
    private api: ApiService,
    private reservoirService: ReservoirService,
    private decadeService: DecadeService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        const reservoir = value['reservoir']
        if (this.subscribe) {
          this.subscribe.unsubscribe()
          this.subscribe = undefined
          this.tableData = []
        }
        this.api.getReservoirById(reservoir).subscribe({
          next: (response: ReservoirResponse) => {
            this.reservoirName = response.name
          }
        })

        this.subscribe = this.api.getDecadeYearsValues(reservoir).subscribe({
          next: (response: CategorisedValueResponse) => {
            console.log(response)
            this.tableData.push(
              this.decadeService.setDecade('Приток, м3/с', response.income.data),
              this.decadeService.setDecade('Попуск, м3/с', response.release.data),
              this.decadeService.setDecade('Уровень, м', response.level.data),
              this.decadeService.setDecade('Объём, млн. м3', response.volume.data),
            )
          }
        })
      }
    })
  }

  changeMetrics(cat: MetricCategory) {
    let income = this.tableData.find(val => val.category.includes('Приток'))
    let release = this.tableData.find(val => val.category.includes('Попуск'))
    if (income && release) {
      income.category = cat == MetricCategory.SPEED ? 'Приток, м3/с' : 'Приток, млн. м3'
      release.category = cat == MetricCategory.SPEED ? 'Попуск, м3/с' : 'Попуск, млн. м3'
      this.reservoirService.convertMetrics(income.stat5, cat, 'decade')
      this.reservoirService.convertMetrics(income.stat10, cat, 'decade')
      this.reservoirService.convertMetrics(income.stat30, cat, 'decade')
      this.reservoirService.convertMetrics(income.statTotal, cat, 'decade')
      this.reservoirService.convertMetrics(release.stat5, cat, 'decade')
      this.reservoirService.convertMetrics(release.stat10, cat, 'decade')
      this.reservoirService.convertMetrics(release.stat30, cat, 'decade')
      this.reservoirService.convertMetrics(release.statTotal, cat, 'decade')
      income.data.forEach(item => this.reservoirService.convertMetricsValueResponse(item, cat, 'decade'))
      release.data.forEach(item => this.reservoirService.convertMetricsValueResponse(item, cat, 'decade'))
    }
  }
}
