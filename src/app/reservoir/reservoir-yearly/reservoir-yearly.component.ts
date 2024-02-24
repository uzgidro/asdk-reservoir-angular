import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {ActivatedRoute} from "@angular/router";
import {CategorisedValueResponse, ValueResponse} from "../../shared/response/values-response";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {Subscription} from "rxjs";
import {MetricCategory} from "../../shared/enum/metric-category";
import {ReservoirService} from "../reservoir.service";

@Component({
  selector: 'app-reservoir-yearly',
  templateUrl: './reservoir-yearly.component.html',
  styleUrl: './reservoir-yearly.component.css'
})
export class ReservoirYearlyComponent implements OnInit {
  reservoirName?: string
  subscribe?: Subscription
  category: number = 0
  months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]
  decade = [
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
  ]
  tableData: {
    category: string
    data: ValueResponse[][]
    statStart?: Date
    statEnd?: Date
    stat5: number[]
    stat10: number[]
    stat30: number[]
    statTotal: number[]
  }[] = []


  constructor(private api: ApiService, private reservoirService: ReservoirService, private activatedRoute: ActivatedRoute) {
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
            const chunkedIncome = this.chunkArray(response.income.data)
            const chunkedRelease = this.chunkArray(response.release.data)
            const chunkedLevel = this.chunkArray(response.level.data)
            const chunkedVolume = this.chunkArray(response.volume.data)

            const incomeStat = this.getStatistics(chunkedIncome)
            const releaseStat = this.getStatistics(chunkedRelease)
            const levelStat = this.getStatistics(chunkedLevel)
            const volumeStat = this.getStatistics(chunkedVolume)

            this.tableData.push({
                category: 'Приток, м3/с',
                data: chunkedIncome,
                statStart: incomeStat.start,
                statEnd: incomeStat.end,
                stat5: incomeStat.stat5,
                stat10: incomeStat.stat10,
                stat30: incomeStat.stat30,
                statTotal: incomeStat.statTotal
              },
              {
                category: 'Попуск, м3/с',
                data: chunkedRelease,
                statStart: releaseStat.start,
                statEnd: releaseStat.end,
                stat5: releaseStat.stat5,
                stat10: releaseStat.stat10,
                stat30: releaseStat.stat30,
                statTotal: releaseStat.statTotal
              },
              {
                category: 'Уровень, м',
                data: chunkedLevel,
                statStart: levelStat.start,
                statEnd: levelStat.end,
                stat5: levelStat.stat5,
                stat10: levelStat.stat10,
                stat30: levelStat.stat30,
                statTotal: levelStat.statTotal
              },
              {
                category: 'Объём, млн. м3',
                data: chunkedVolume,
                statStart: volumeStat.start,
                statEnd: volumeStat.end,
                stat5: volumeStat.stat5,
                stat10: volumeStat.stat10,
                stat30: volumeStat.stat30,
                statTotal: volumeStat.statTotal
              }
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

  private getStatistics(chunked: ValueResponse[][]) {
    let start
    let end
    let stat5: number[] = []
    let stat10: number[] = []
    let stat30: number[] = []
    let statTotal: number[] = []
    for (let i = 0; i < this.decade.length; i++) {
      // get all data by this decade
      const dateData = chunked
        .map(sub => sub[i])
        .sort(
          (a, b) => {
            if (new Date(a.date) > new Date(b.date))
              return 1
            else if (new Date(a.date) < new Date(b.date))
              return -1
            else
              return 0
          })
      if (i == 0) {
        start = new Date(dateData[0].date)
        end = new Date(dateData[dateData.length - 1].date)
      }
      if (dateData.length >= 5) {
        const slicedArray = dateData.slice(-5)
        const data = slicedArray.reduce((acc, currentValue) => acc + currentValue.value, 0)
        stat5.push(Math.round(data / slicedArray.length))
      }
      if (dateData.length >= 10) {
        const slicedArray = dateData.slice(-10)
        const data = slicedArray.reduce((acc, currentValue) => acc + currentValue.value, 0)
        stat10.push(Math.round(data / slicedArray.length))
      }
      if (dateData.length >= 30) {
        const slicedArray = dateData.slice(-30)
        const data = slicedArray.reduce((acc, currentValue) => acc + currentValue.value, 0)
        stat30.push(Math.round(data / slicedArray.length))
      }
      const data = dateData.reduce((acc, currentValue) => acc + currentValue.value, 0)
      statTotal.push(Math.round(data / dateData.length))
    }
    return {
      start: start,
      end: end,
      stat5: stat5,
      stat10: stat10,
      stat30: stat30,
      statTotal: statTotal,
    }
  }


  private chunkArray(array: ValueResponse[]) {
    // remove 1st element if it's not january
    while (new Date(array[0].date).getMonth() !== 0) {
      array = array.slice(1)
    }
    // 12 months with 3 decades = 36
    const size = this.decade.length
    return Array.from(
      {length: Math.ceil(array.length / size)},
      (_, index) =>
        array.slice(index * size, index * size + size)
    );
  }
}
