import {Component, OnInit} from '@angular/core';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {DecadeService} from "../decade.service";
import {CommonModule, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ApiService} from "../../service/api.service";
import {ActivatedRoute} from "@angular/router";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {CategorisedValueResponse, ComplexValueResponse} from "../../shared/response/values-response";
import {Subject, Subscription} from "rxjs";
import {Decade} from "../../shared/interfaces";
import {FormsModule} from "@angular/forms";
import {EnvService} from "../../shared/service/env.service";

@Component({
  selector: 'app-reservoir-schedule',
  standalone: true,
  imports: [
    DecimalPipe,
    NgForOf,
    NgIf,
    NgClass,
    FormsModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './reservoir-schedule.component.html',
  styleUrl: './reservoir-schedule.component.css'
})
export class ReservoirScheduleComponent implements OnInit {

  reservoirName?: string
  reservoirId?: any
  existingIncomeYears: number[] = []
  existingReleaseYears: number[] = []
  selectedIncomeYears: number[] = [];
  isIncomeRadioSelected = false;
  isReleaseRadioSelected = false;
  selectedReleaseYears: number[] = [];
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
  incomeForecastCategory: 'perAvg' | 'perLast' | 'five' | 'ten' | 'last' | 'max' | 'min' | '30' = 'perLast'
  incomePercent = 80
  releaseForecastCategory: 'perAvg' | 'perLast' | 'five' | 'ten' | 'last' | 'max' | 'min' | '30' = 'perLast'
  releasePercent = 80
  volumeForecastStart: number[] = []
  volumeForecastEnd: number[] = []
  levelForecast: Subject<number[]> = new Subject<number[]>()
  levelDifferenceForecast: { value: number, error: boolean }[] = []
  gesPower: number[] = []
  lowerLevel?: number
  gesCoefficient?: number
  private subscribe?: Subscription
  private readonly G_POWER = 9.81

  approvedIncome: number[] = []
  approvedRelease: number[] = []
  approvedLevel: number[] = []
  approvedVolumeStart: number[] = []
  approvedVolumeEnd: number[] = []

  selectedIncomeRadio: string | null = null;
  selectedReleaseRadio: string | null = null;
  selectedIncomePercent: number | null = 80;
  selectedReleasePercent: number | null = 80;


  flowForecast: { income: number[], release: number[] } = {income: [], release: []}
  flowForecastObs: Subject<{ income: number[], release: number[] }> = new Subject<{
    income: number[],
    release: number[]
  }>()

  releaseLevelForecast: { release: number[], level: number[] } = {release: [], level: []}
  releaseLevelForecastObs: Subject<{ release: number[], level: number[] }> = new Subject<{
    release: number[];
    level: number[]
  }>()


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
        const reservoir = value['reservoir'] as number
        if (this.subscribe) {
          this.subscribe.unsubscribe()
          this.subscribe = undefined
        }
        this.api.getReservoirById(reservoir).subscribe({
          next: (response: ReservoirResponse) => {
            this.reservoirName = response.name
            this.reservoirId = response.id
            this.lowerLevel = this.env.getRegionByName(response.name)?.lowerLevel
            this.gesCoefficient = this.env.getRegionByName(response.name)?.gesCoefficient
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
        this.api.getThisYearValues(reservoir).subscribe({
          next: (response: CategorisedValueResponse) => {
            const currentYear = new Date().getFullYear().toString();
            this.setFlowForecast(
              response.income.data.filter(m => m.date.includes(currentYear)).map(m => m.value),
              response.release.data.filter(m => m.date.includes(currentYear)).map(m => m.value),
            )
            const allIncomeYearData = response.income.data.filter(el => !el.date.includes(currentYear));
            const allReleaseYearData = response.release.data.filter(el => !el.date.includes(currentYear));
            //All years
            this.existingIncomeYears = this.extractYears(allIncomeYearData);
            this.existingReleaseYears = this.extractYears(allReleaseYearData)
          }
        })
        this.api.getApprovedSchedule(reservoir).subscribe({
          next: (response: {
            income: number,
            release: number,
            level: number,
            volumeStart: number,
            volumeEnd: number
          }[]) => {
            this.approvedIncome = response.map(m => m.income)
            this.approvedRelease = response.map(m => m.release)
            this.approvedLevel = response.map(m => m.level)
            this.approvedVolumeStart = response.map(m => m.volumeStart)
            this.approvedVolumeEnd = response.map(m => m.volumeEnd)
          }
        })
      }
    })
    this.subscribeSubjects()
  }


  onReleaseRadioChange(event: any) {
    this.isReleaseRadioSelected = event.target.checked

    if (this.isReleaseRadioSelected && this.selectedReleaseYears.length > 0) {
      this.api.getVegetativeSelectedValues(this.reservoirId, 'release', this.selectedReleaseYears).subscribe({
        next: (values: ComplexValueResponse) => {
          this.setFlowForecast(undefined, values.data.map(item => item.value))
        },
      })

    }

  }

  onIncomeRadioChange(event: any) {
    this.isIncomeRadioSelected = event.target.checked

    if (this.isIncomeRadioSelected && this.selectedIncomeYears.length > 0) {
      this.api.getVegetativeSelectedValues(this.reservoirId, 'income', this.selectedIncomeYears).subscribe({
        next: (values: ComplexValueResponse) => {
          this.setFlowForecast(values.data.map(item => item.value))
        },
      })
    }
  }


  changeIncomeForecast(category: 'perAvg' | 'perLast' | 'five' | 'ten' | 'last' | 'max' | 'min' | '30') {
    this.selectedIncomeRadio = category;
    //percent min max==null
    this.incomeForecastCategory = category
    this.setIncomePercentForecast()
    // this.selectedIncomeYears=[]
    this.isIncomeRadioSelected = false
    if (this.income) {
      if (this.incomeForecastCategory == 'five') {
        this.setFlowForecast(this.income.stat5)
      } else if (this.incomeForecastCategory == 'ten') {
        this.setFlowForecast(this.income.stat10)
      } else if (this.incomeForecastCategory == 'last') {
        this.setFlowForecast(this.income.statLastYear)
      } else if (this.incomeForecastCategory == '30') {
        this.setFlowForecast(this.income.stat30)
      } else if (this.incomeForecastCategory == 'max') {
        this.api.getVegetativeMaxValues(this.reservoirId).subscribe({
          next: (values: ComplexValueResponse) => {
            this.setFlowForecast(values.data.map(item => item.value))
          }
        })
      } else if (this.incomeForecastCategory == 'min') {
        if (this.reservoirId) {
          this.api.getVegetativeMinValues(this.reservoirId).subscribe({
            next: (values: ComplexValueResponse) => {
              this.setFlowForecast(values.data.map(item => item.value))
            }
          })
        }
      }
    }
  }

  changeReleaseForecast(category: 'perAvg' | 'perLast' | 'five' | 'ten' | '30' | 'last' | 'max' | 'min') {
    this.selectedReleaseRadio = category;
    this.releaseForecastCategory = category
    this.setReleasePercentForecast()
    // this.selectedReleaseYears=[]
    this.isReleaseRadioSelected = false
    if (this.release) {
      if (this.releaseForecastCategory == 'five') {
        this.setFlowForecast(undefined, this.release.stat5)
      } else if (this.releaseForecastCategory == 'ten') {
        this.setFlowForecast(undefined, this.release.stat10)
      } else if (this.releaseForecastCategory == 'last') {
        this.setFlowForecast(undefined, this.release.statLastYear)
      } else if (this.releaseForecastCategory == '30') {
        this.setFlowForecast(undefined, this.release.stat30)
      } else if (this.releaseForecastCategory == 'max') {
        this.api.getVegetativeMaxValues(this.reservoirId, 'release').subscribe({
          next: (values: ComplexValueResponse) => {
            this.setFlowForecast(undefined, values.data.map(item => item.value))
          }
        })
      } else if (this.releaseForecastCategory == 'min') {
        this.api.getVegetativeMinValues(this.reservoirId, 'release').subscribe({
          next: (values: ComplexValueResponse) => {
            this.setFlowForecast(undefined, values.data.map(item => item.value))
          }
        })
      }
    }
  }

  changeIncomePercent(event: any) {
    this.selectedIncomePercent = event.target.value
    this.incomePercent = typeof event.target.valueAsNumber == 'number' ? event.target.valueAsNumber : 0
    this.setIncomePercentForecast()
    this.isIncomeRadioSelected = false

  }

  changeReleasePercent(event: any) {
    this.selectedReleasePercent = event.target.value;
    this.releasePercent = typeof event.target.valueAsNumber == 'number' ? event.target.valueAsNumber : 0
    this.setReleasePercentForecast()
    this.isReleaseRadioSelected = false
  }

  calcFlowVolume(array?: number[]) {
    if (array != null && array.length > 0) {
      let sum = array.reduce((sum: number, value: number) => sum + value, 0);
      let days = array.length * 10;
      if (array.length >= 13) days += 3
      else if (array.length >= 11) days += 2
      else if (array.length >= 5) days += 1
      return (sum / array.length) * 0.0864 * days
    }
    return 0
  }

  extractYears(data: any[]): number[] {
    return data.map(entry => new Date(entry.date).getFullYear())
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  changeSelectedIncomeForecast(event: MatSelectChange): void {
    this.selectedIncomeRadio = null
    this.selectedIncomeYears = event.value;
    if (this.isIncomeRadioSelected && this.selectedIncomeYears.length > 0) {
      this.api.getVegetativeSelectedValues(this.reservoirId, 'income', this.selectedIncomeYears).subscribe({
        next: (values: ComplexValueResponse) => {
          this.setFlowForecast(values.data.map(item => item.value))
        },
      })
    }
  }

  changeSelectedReleaseForecast(event: any): void {
    this.selectedReleaseRadio = null;
    this.selectedReleaseYears = event.value;
    if (this.isReleaseRadioSelected && this.selectedReleaseYears.length > 0) {
      this.api.getVegetativeSelectedValues(this.reservoirId, 'release', this.selectedReleaseYears).subscribe({
        next: (values: ComplexValueResponse) => {
          this.setFlowForecast(undefined, values.data.map(item => item.value))
        },
      })
    }
  }

  private subscribeSubjects() {
    this.flowForecastObs.subscribe({
      next: forecast => {
        this.setReleaseLevelForecast(forecast.release)
        if (forecast.income?.length == forecast.release?.length)
          this.setVolumeForecast(forecast.income, forecast.release)
      }
    })
    this.levelForecast.subscribe({
      next: forecast => {
        this.levelDifferenceForecast = []
        this.setReleaseLevelForecast(undefined, forecast)
        this.levelDifferenceForecast.push({value: 0, error: false})
        for (let i = 1; i <= forecast.length - 1; i++) {
          let days = i == 6 || i == 12 || i == 14 ? 11 : 10
          const difference = (forecast[i] - forecast[i - 1]) / days;
          this.setupLevelDifferenceForecastWithConstraints(forecast[i - 1], difference)
        }
      }
    })
    this.releaseLevelForecastObs.subscribe({
      next: value => {
        if (value.release.length == value.level.length)
          this.calcGesPower(value.release, value.level)
      }
    })
  }

  private setVolumeForecast(incomeForecast: number[], releaseForecast: number[]) {
    const volumeForecast: number[] = []
    this.volumeForecastStart = []
    this.volumeForecastEnd = []
    volumeForecast.push(this.env.getRegionByName(this.reservoirName!)?.vegetateVolume!)
    for (let i = 0; i < incomeForecast.length; i++) {
      // 11 days at third decade of may, july and august
      let days = i == 5 || i == 11 || i == 13 ? 11 : 10
      const change = incomeForecast[i] * 0.0864 * days - releaseForecast[i] * 0.0864 * days
      volumeForecast.push(volumeForecast[i] + change)
    }
    this.volumeForecastStart = volumeForecast.slice(0, 18)
    this.volumeForecastEnd = volumeForecast.slice(1, 19)
    this.calcLevelForecast(this.volumeForecastEnd)
  }

  private setIncomePercentForecast() {
    if (this.incomeForecastCategory == 'perAvg' && this.income) {
      this.setFlowForecast(this.income?.statTotal.map(item => Math.round(item * this.incomePercent / 100)))
    } else if (this.incomeForecastCategory == 'perLast' && this.income) {
      this.setFlowForecast(this.income?.statLastYear.map(item => Math.round(item * this.incomePercent / 100)))
    }
  }

  private setReleasePercentForecast() {
    if (this.releaseForecastCategory == 'perAvg' && this.release) {
      this.setFlowForecast(undefined, this.release?.statTotal.map(item => Math.round(item * this.releasePercent / 100)))
    } else if (this.releaseForecastCategory == 'perLast' && this.release) {
      this.setFlowForecast(undefined, this.release?.statLastYear.map(item => Math.round(item * this.releasePercent / 100)))
    }
  }

  private calcLevelForecast(volumeForecast: number[]) {
    this.api.getLevelForecast(this.reservoirId, volumeForecast).subscribe({
      next: values => {
        this.levelForecast.next(values)
      }
    })
  }

  private calcGesPower(releaseForecast: number[], levelForecast: number[]) {
    if (this.lowerLevel && this.gesCoefficient) {
      this.gesPower = []
      for (let i = 0; i < releaseForecast.length; i++) {
        let days = i == 5 || i == 11 || i == 13 ? 11 : 10
        if (levelForecast[i] <= 0) {
          this.gesPower.push(0)
        } else {
          this.gesPower.push((this.G_POWER * (levelForecast[i] - this.lowerLevel) * releaseForecast[i] * this.gesCoefficient) * 24 * days / 1000)
        }
      }
    }
  }

  private setReleaseLevelForecast(release?: number[], level?: number[]): void {
    if (release != undefined) {
      this.releaseLevelForecast.release = release
    }
    if (level != undefined) {
      this.releaseLevelForecast.level = level
    }
    this.releaseLevelForecastObs.next(this.releaseLevelForecast)
  }

  private setFlowForecast(income?: number[], release?: number[]): void {
    if (income != undefined) {
      this.flowForecast.income = income
    }
    if (release != undefined) {
      this.flowForecast.release = release
    }
    this.flowForecastObs.next(this.flowForecast)
  }

  private setupLevelDifferenceForecastWithConstraints(level: number, difference: number) {
    switch (this.reservoirId) {
      case 1: {
        if ((level <= 891 && difference >= -1 && difference <= 1) ||
          (level <= 901 && difference >= -0.5 && difference <= 0.5) ||
          (level <= 906 && difference >= -0.3 && difference <= 0.3)) {
          this.levelDifferenceForecast.push({value: difference, error: false})
        } else {
          this.levelDifferenceForecast.push({value: difference, error: true})
        }
        break
      }
      case 2: {
        if ((level >= 1010 && level <= 1070.5 && difference >= -1) ||
          (level <= 1080.5 && difference >= -0.5 && difference <= 0.5)) {
          this.levelDifferenceForecast.push({value: difference, error: false})
        } else {
          this.levelDifferenceForecast.push({value: difference, error: true})
        }
        break
      }
      case 3: {
        if (level >= 277 && level <= 289 && difference >= -0.05 && difference <= 0.07) {
          this.levelDifferenceForecast.push({value: difference, error: false})
        } else {
          this.levelDifferenceForecast.push({value: difference, error: true})
        }
        break
      }
      case 4: {
        if ((level >= 1060 && level <= 1100 && difference >= -1 && difference <= 1) ||
          (level <= 1118 && difference >= -0.3 && difference <= 0.4)) {
          this.levelDifferenceForecast.push({value: difference, error: false})
        } else {
          this.levelDifferenceForecast.push({value: difference, error: true})
        }
        break
      }
      case 5: {
        if ((level <= 891 && difference >= -1 && difference <= 1) ||
          (level <= 925 && difference >= -0.5 && difference <= 1) ||
          (level <= 945 && difference >= -0.3 && difference <= 0.5) ||
          (level <= 960 && difference >= -0.3 && difference <= 0.5)) {
          this.levelDifferenceForecast.push({value: difference, error: false})
        } else {
          this.levelDifferenceForecast.push({value: difference, error: true})
        }
        break
      }
      default: {
        this.levelDifferenceForecast.push({value: difference, error: false})
        break
      }
    }
  }
}
