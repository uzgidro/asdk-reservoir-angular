import {Component, OnInit} from '@angular/core';
import {DecadeService} from "../decade.service";
import {DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {ApiService} from "../../service/api.service";
import {ActivatedRoute} from "@angular/router";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {CategorisedValueResponse, ComplexValueResponse} from "../../shared/response/values-response";
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
  reservoirId?: any
  months = [
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
  ]
  decade: string[] = [
    "I", "II", "III",
    "I", "II", "III",
    "I", "II", "III",
    "I", "II", "III",
    "I", "II", "III",
    "I", "II", "III",
  ]
  income?: Decade
  release?: Decade
  level?: Decade
  volume?: Decade
  incomeForecast: number[] = new Array(18).fill(0)
  incomeForecastCategory: 'perAvg' | 'perLast' | 'five' | 'ten' | 'last' | 'max' | 'min' | '30' = 'perLast'
  incomePercent = 80
  releaseForecast: number[] = new Array(18).fill(0)
  releaseForecastCategory: 'perAvg' | 'perLast' | 'five' | 'ten' | 'last' | 'max' | 'min' | '30' = 'perLast'
  releasePercent = 80
  volumeForecastStart: number[] = new Array(18).fill(0)
  volumeForecastEnd: number[] = new Array(18).fill(0)
  levelForecast: number[] = new Array(18).fill(0)
  levelForecastChange: number[] = new Array(18).fill(0)
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
            this.reservoirId = response.id
          }
        })

        this.subscribe = this.api.getVegetativeDecadeYearsValues(reservoir).subscribe({
          next: (response: CategorisedValueResponse) => {
            this.income = this.decadeService.setDecade('', response.income.data, true)
            this.release = this.decadeService.setDecade('', response.release.data, true)
            this.level = this.decadeService.setDecade('', response.level.data, true)
            this.volume = this.decadeService.setDecade('', response.volume.data, true)
          }
        })
      }
    })
  }

  changeIncomeForecast(category: 'perAvg' | 'perLast' | 'five' | 'ten' | 'last' | 'max' | 'min' | '30') {
    this.incomeForecastCategory = category
    this.setIncomePercentForecast()
    if (this.income) {
      if (this.incomeForecastCategory == 'five') {
        this.incomeForecast = this.income.stat5
      } else if (this.incomeForecastCategory == 'ten') {
        this.incomeForecast = this.income.stat10
      } else if (this.incomeForecastCategory == 'last') {
        this.incomeForecast = this.income.statLastYear
      } else if (this.incomeForecastCategory == '30') {
        this.incomeForecast = this.income.stat30
      } else if (this.incomeForecastCategory == 'max') {
        this.api.getVegetativeMaxValues(this.reservoirId).subscribe({
          next: (values: ComplexValueResponse) => {
            this.incomeForecast = values.data.map(item => item.value)
          }
        })
      } else if (this.incomeForecastCategory == 'min') {
        if (this.reservoirId) {
          this.api.getVegetativeMinValues(this.reservoirId).subscribe({
            next: (values: ComplexValueResponse) => {
              this.incomeForecast = values.data.map(item => item.value)
            }
          })
        }
      }
    }
    this.setVolumeForecast()
  }

  changeReleaseForecast(category: 'perAvg' | 'perLast' | 'five' | 'ten' | '30' | 'last' | 'max' | 'min') {
    this.releaseForecastCategory = category
    this.setReleasePercentForecast()
    if (this.release) {
      if (this.releaseForecastCategory == 'five') {
        this.releaseForecast = this.release.stat5
      } else if (this.releaseForecastCategory == 'ten') {
        this.releaseForecast = this.release.stat10
      } else if (this.releaseForecastCategory == 'last') {
        this.releaseForecast = this.release.statLastYear
      } else if (this.releaseForecastCategory == '30') {
        this.releaseForecast = this.release.stat30
      } else if (this.releaseForecastCategory == 'max') {
        this.api.getVegetativeMaxValues(this.reservoirId, 'release').subscribe({
          next: (values: ComplexValueResponse) => {
            this.releaseForecast = values.data.map(item => item.value)
          }
        })
      } else if (this.releaseForecastCategory == 'min') {
        this.api.getVegetativeMinValues(this.reservoirId, 'release').subscribe({
          next: (values: ComplexValueResponse) => {
            this.releaseForecast = values.data.map(item => item.value)
          }
        })
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


  changeSelectedIncomeValue(inputEl: any) {
    this.api.getVegetativeSelectedValues(this.reservoirId, 'income', inputEl.value).subscribe({
      next: (values: ComplexValueResponse) => {
        console.log(values);
        this.incomeForecast = values.data.map(item => item.value)
      },
      complete: () => this.setVolumeForecast()
    })
  }

  changeSelectedReleaseValue(inputEl: any) {
    this.api.getVegetativeSelectedValues(this.reservoirId, 'release', inputEl.value).subscribe({
      next: (values: ComplexValueResponse) => {
        console.log(values);
        this.releaseForecast = values.data.map(item => item.value)
      },
      complete: () => this.setVolumeForecast()
    })
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
    this.calcLevelForecast(this.reservoirId, forecast)
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

  private calcLevelForecast(id: number, forecast: number[]) {
    this.api.getLevelForecast(id, forecast).subscribe({
      next: values => {
        this.levelForecast = values.slice(1, 19)
        const differences = values
        this.levelForecastChange = []
        for (let i = 1; i < differences.length; i++) {
          let days = i == 6 || i == 12 || i == 14 ? 11 : 10
          const difference = (differences[i] - differences[i - 1]) / days;
          this.levelForecastChange.push(difference)
        }
      }
    })
  }
}
