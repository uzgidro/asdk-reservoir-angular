import {Component, OnInit} from '@angular/core';
import {DecadeService} from "../decade.service";
import {DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {ApiService} from "../../service/api.service";
import {ActivatedRoute} from "@angular/router";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {CategorisedValueResponse} from "../../shared/response/values-response";
import {Subscription} from "rxjs";
import {Decade} from "../../shared/interfaces";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-reservoir-schedule',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './reservoir-schedule.component.html',
  styleUrl: './reservoir-schedule.component.css'
})
export class ReservoirScheduleComponent implements OnInit {

  reservoirName?: string
  months: string[] = this.decadeService.months.splice(3, 6);
  decade: string[] = this.decadeService.decade.splice(0, 18);
  income?: Decade
  release?: Decade
  level?: Decade
  volume?: Decade
  incomeForecast: number[] = new Array(18).fill(0)
  incomeForecastCategory: 'perAvg' | 'perLast' | 'five' | 'ten' | 'last' | 'max' | 'min' = 'perLast'
  incomePercent = 80
  private subscribe?: Subscription

  constructor(private decadeService: DecadeService, private api: ApiService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        const reservoir = value['reservoir']
        if (this.subscribe) {
          this.subscribe.unsubscribe()
          this.subscribe = undefined
        }
        this.api.getReservoirById(reservoir).subscribe({
          next: (response: ReservoirResponse) => {
            this.reservoirName = response.name
          }
        })

        this.subscribe = this.api.getVegetativeDecadeYearsValues(reservoir).subscribe({
          next: (response: CategorisedValueResponse) => {
            this.income = this.decadeService.setDecade('', response.income.data, false)
            this.release = this.decadeService.setDecade('', response.release.data, false)
            this.level = this.decadeService.setDecade('', response.level.data, false)
            this.volume = this.decadeService.setDecade('', response.volume.data, false)
          }
        })
      }
    })
  }

  changeIncomeForecast(category: 'perAvg' | 'perLast' | 'five' | 'ten' | 'last' | 'max' | 'min') {
    this.incomeForecastCategory = category
    this.setPercentForecast()
    if (this.income) {
      if (this.incomeForecastCategory == 'five') {
        this.incomeForecast = this.income.stat5
      } else if (this.incomeForecastCategory == 'ten') {
        this.incomeForecast = this.income.stat10
      } else if (this.incomeForecastCategory == 'last') {
        this.incomeForecast = this.income.statLastYear
      }
    }
  }

  changeIncomePercent(event: any) {
    this.incomePercent = typeof event.target.valueAsNumber == 'number' ? event.target.valueAsNumber : 0
    this.setPercentForecast()
  }

  private setPercentForecast() {
    if (this.incomeForecastCategory == 'perAvg' && this.income) {
      this.incomeForecast = this.income?.statTotal.map(item => Math.round(item * this.incomePercent / 100))
    } else if (this.incomeForecastCategory == 'perLast' && this.income) {
      this.incomeForecast = this.income?.statLastYear.map(item => Math.round(item * this.incomePercent / 100))
    }
  }
}
