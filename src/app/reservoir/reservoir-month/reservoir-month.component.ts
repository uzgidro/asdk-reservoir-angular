import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {CategorisedValueResponse} from "../../shared/response/values-response";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {MetricCategory} from "../../shared/enum/metric-category";
import {ReservoirService} from "../reservoir.service";
import {MetricSelectComponent} from "../../shared/component/metric-select/metric-select.component";
import {DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {RusMonthPipe} from "../../shared/pipe/rus-month.pipe";
import {LoaderComponent} from "../../shared/component/loader/loader.component";

@Component({
  selector: 'app-reservoir-month',
  templateUrl: './reservoir-month.component.html',
  styleUrl: './reservoir-month.component.css',
  imports: [
    MetricSelectComponent,
    NgForOf,
    NgIf,
    DecimalPipe,
    DatePipe,
    RusMonthPipe,
    LoaderComponent
  ],
  standalone: true
})
export class ReservoirMonthComponent implements OnInit {
  reservoirName?: string
  metrics: MetricCategory = MetricCategory.SPEED
  data: {
    date: Date
    income: any[]
    release: any[]
    level: any[]
    volume: any[]
  }[] = []

  protected readonly MetricCategory = MetricCategory;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private reservoirService: ReservoirService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.api.getReservoirById(value['reservoir']).subscribe({
          next: (response: ReservoirResponse) => {
            this.reservoirName = response.name
          }
        })
        this.api.getMonthReservoirValues(value['reservoir']).subscribe({
          next: (response: CategorisedValueResponse) => {
            this.data = []
            this.setupTableData(response)
          }
        })
      }
    })
  }

  changeCategory(event: MetricCategory) {
    this.metrics = event
    this.data.forEach(month => {
      this.reservoirService.convertMetrics(month.income, event)
      this.reservoirService.convertMetrics(month.release, event)
    })
  }

  getAvg(array: any[]) {
    const numbersArray: number[] = array.filter(item => typeof item === 'number');
    if (numbersArray.length > 0) {
      return numbersArray.reduce((sum, num) => sum + num, 0) / numbersArray.length;
    } else {
      return 0
    }
  }

  private setupTableData(response: CategorisedValueResponse) {
    for (let income of response.income.data) {
      let valueDate = new Date(income.date)
      let monthData = this.data.find(value => value.date.getMonth() == valueDate.getMonth())
      if (monthData && monthData.income) {
        monthData.income.push(income.value)
      } else {
        this.data[valueDate.getMonth()] = {
          date: valueDate,
          income: [income.value],
          release: [],
          level: [],
          volume: []
        }
      }
    }
    for (let release of response.release.data) {
      let valueDate = new Date(release.date)
      let monthData = this.data.find(value => value.date.getMonth() == valueDate.getMonth())
      if (monthData && monthData.release) {
        monthData.release.push(release.value)
      } else if (monthData) {
        monthData.release = [release.value]
      }
    }
    for (let level of response.level.data) {
      let valueDate = new Date(level.date)
      let monthData = this.data.find(value => value.date.getMonth() == valueDate.getMonth())
      if (monthData && monthData.level) {
        monthData.level.push(level.value)
      } else if (monthData) {
        monthData.level = [level.value]
      }
    }
    for (let volume of response.volume.data) {
      let valueDate = new Date(volume.date)
      let monthData = this.data.find(value => value.date.getMonth() == valueDate.getMonth())
      if (monthData && monthData.volume) {
        monthData.volume.push(volume.value)
      } else if (monthData) {
        monthData.volume = [volume.value]
      }
    }
    for (let item of this.data) {
      if (item.income && item.income?.length < 31) {
        item.income = [...item.income, ...new Array(31 - item.income.length).fill('')];
      }
      if (item.release && item.release?.length < 31) {
        item.release = [...item.release, ...new Array(31 - item.release.length).fill('')];
      }
      if (item.level && item.level?.length < 31) {
        item.level = [...item.level, ...new Array(31 - item.level.length).fill('')];
      }
      if (item.volume && item.volume?.length < 31) {
        item.volume = [...item.volume, ...new Array(31 - item.volume.length).fill('')];
      }
    }
  }
}
