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
import {EnvService} from "../../shared/service/env.service";

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
  releaseForecast: number[] = new Array(18).fill(0)
  releaseForecastCategory: 'perAvg' | 'perLast' | 'five' | 'ten' | 'last' | 'max' | 'min' = 'perLast'
  releasePercent = 80
  volumeForecastStart: number[] = new Array(18).fill(0)
  volumeForecastEnd: number[] = new Array(18).fill(0)
  private subscribe?: Subscription

  constructor(
    private decadeService: DecadeService,
    private api: ApiService,
    private env: EnvService,
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
    this.setIncomePercentForecast()
    if (this.income) {
      if (this.incomeForecastCategory == 'five') {
        this.incomeForecast = this.income.stat5
      } else if (this.incomeForecastCategory == 'ten') {
        this.incomeForecast = this.income.stat10
      } else if (this.incomeForecastCategory == 'last') {
        this.incomeForecast = this.income.statLastYear
      }
    }
    this.setVolumeForecast()
  }

  changeReleaseForecast(category: 'perAvg' | 'perLast' | 'five' | 'ten' | 'last' | 'max' | 'min') {
    this.releaseForecastCategory = category
    this.setReleasePercentForecast()
    if (this.release) {
      if (this.releaseForecastCategory == 'five') {
        this.releaseForecast = this.release.stat5
      } else if (this.releaseForecastCategory == 'ten') {
        this.releaseForecast = this.release.stat10
      } else if (this.releaseForecastCategory == 'last') {
        this.releaseForecast = this.release.statLastYear
      }
    }
    this.setVolumeForecast()
  }

  changeIncomePercent(event: any) {
    this.incomePercent = typeof event.target.valueAsNumber == 'number' ? event.target.valueAsNumber : 0
    this.setIncomePercentForecast()
    this.setVolumeForecast()
  }

  changeReleasePercent(event: any) {
    this.releasePercent = typeof event.target.valueAsNumber == 'number' ? event.target.valueAsNumber : 0
    this.setReleasePercentForecast()
    this.setVolumeForecast()
  }

  private setVolumeForecast() {
    const forecast: number[] = []
    this.volumeForecastStart = []
    this.volumeForecastEnd = []
    forecast.push(this.env.getRegionByName(this.reservoirName!)?.vegetateVolume!)
    for (let i = 0; i < this.incomeForecast.length; i++) {
      // 11 days at third decade of may, july and august
      let days = i == 5 || i == 11 || i == 13 ? 11 : 10
      const change = this.incomeForecast[i] * 0.0864 * days - this.releaseForecast[i] * 0.0864 * days
      forecast.push(forecast[i] + change)
    }
    this.volumeForecastStart = forecast.slice(0, 18)
    this.volumeForecastEnd = forecast.slice(1, 19)
  }

  private setIncomePercentForecast() {
    if (this.incomeForecastCategory == 'perAvg' && this.income) {
      this.incomeForecast = this.income?.statTotal.map(item => Math.round(item * this.incomePercent / 100))
    } else if (this.incomeForecastCategory == 'perLast' && this.income) {
      this.incomeForecast = this.income?.statLastYear.map(item => Math.round(item * this.incomePercent / 100))
    }
  }

  private setReleasePercentForecast() {
    if (this.releaseForecastCategory == 'perAvg' && this.release) {
      this.releaseForecast = this.release?.statTotal.map(item => Math.round(item * this.releasePercent / 100))
    } else if (this.incomeForecastCategory == 'perLast' && this.release) {
      this.releaseForecast = this.release?.statLastYear.map(item => Math.round(item * this.releasePercent / 100))
    }
  }
}
