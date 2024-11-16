import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {CategorisedValueResponse, ComplexValueResponse} from "../../shared/response/values-response";
import {DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {LoaderComponent} from "../../shared/component/loader/loader.component";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {UzbMonthPipePipe} from "../../shared/pipe/uzb-month-pipe.pipe";

@Component({
  selector: 'app-reservoir-decade',
  templateUrl: './reservoir-decade.component.html',
  styleUrls: ['./reservoir-decade.component.css'],
  imports: [
    NgIf,
    DatePipe,
    LoaderComponent,
    DecimalPipe,
    NgForOf,
    CardHeaderComponent,
    UzbMonthPipePipe
  ],
  standalone: true
})

export class ReservoirDecadeComponent implements OnInit {

  today = new Date();
  pastYear = this.today.getFullYear() - 1
  currentYear = this.today.getFullYear()
  decade = this.calculateDecade()
  daysInDecade: number[] = []
  tableData?: CategorisedValueResponse
  avgIncome?: number
  avgRelease?: number
  totalValues: {
    reservoir: string
    decadeAvg30?: any
    decadeAvg10?: any,
    decadeLastYear?: any
    decadeCurrentYear?: any
    avg30?: any
    avg10?: any,
    lastYear?: any
    currentYear?: any
  }[] = []

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) {
  }

  ngOnInit() {
    this.setDecade()
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        const reservoir = value['reservoir']
        this.api.getDecadeReservoirValues(reservoir).subscribe({
          next: (response: CategorisedValueResponse) => {
            this.tableData = response
            this.avgIncome = this.getAvg(this.tableData.income.data.map(item => item.value))
            this.avgRelease = this.getAvg(this.tableData.release.data.map(item => item.value))
          }
        })
      }
    })
    this.api.getTotalDecadeReservoirValues().subscribe({
      next: (response: { avg: ComplexValueResponse[], year: ComplexValueResponse[] }) => {
        for (let item of response.avg) {
          const data = this.parseYearlyResponse(item)
          if (data.current && data.lastYear) {
            this.totalValues.push({
              reservoir: item.reservoir,
              decadeCurrentYear: Math.round(data.current * 0.0864),
              decadeLastYear: Math.round(data.lastYear * 0.0864),
              decadeAvg10: Math.round(data.data10 * 0.0864),
              decadeAvg30: Math.round(data.data30 * 0.0864),
            })
          }
        }
        for (let item of response.year) {
          const data = this.parseYearlyResponse(item)
          let value = this.totalValues.find(val => val.reservoir === item.reservoir);
          if (value && data.current && data.lastYear) {
            value.currentYear = Math.round(data.current * 0.0864)
            value.lastYear = Math.round(data.lastYear * 0.0864)
            value.avg10 = Math.round(data.data10 * 0.0864)
            value.avg30 = Math.round(data.data30 * 0.0864)
          }
        }
      }
    })
  }

  private parseYearlyResponse(response: ComplexValueResponse) {
    const current = response.data.find(
      value => new Date(value.date).getFullYear() === new Date().getFullYear() - 1
    )?.value

    const data = response.data.filter(
      value => new Date(value.date).getFullYear() < new Date().getFullYear() - 1
    )
    let lastYear = data.find(
      value => new Date(value.date).getFullYear() === new Date().getFullYear() - 2
    )?.value
    let data30: any = 0
    let data10: any = 0
    if (data.length >= 30) {
      data30 = this.getAvg(data.filter(
        value => new Date(value.date).getFullYear() >= new Date().getFullYear() - 31
      ).map(i => i.value))
    }
    if (data.length >= 10) {
      data10 = this.getAvg(data.filter(
        value => new Date(value.date).getFullYear() >= new Date().getFullYear() - 11
      ).map(i => i.value))
    }
    return {
      current: current,
      lastYear: lastYear,
      data10: data10,
      data30: data30
    }
  }

  private calculateDecade() {
    const currentDate = this.today;
    const dayOfMonth = currentDate.getDate();

    let resultDate: number;

    if (dayOfMonth >= 1 && dayOfMonth <= 9) {
      const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      resultDate = previousMonth.getDate();
    } else if (dayOfMonth >= 10 && dayOfMonth <= 19) {
      resultDate = 10;
    } else if (dayOfMonth >= 20) {
      resultDate = 20
    } else {
      resultDate = dayOfMonth;
    }

    return new Date(new Date().setDate(resultDate))
  }

  private setDecade() {
    let start
    let end
    if (this.today.getDate() < 11) {
      start = 1
      end = 10
    } else if (this.today.getDate() >= 11 && this.today.getDate() < 21) {
      start = 11
      end = 20
    } else {
      start = 21
      end = new Date(this.currentYear, this.today.getMonth(), 0).getDate()
    }
    for (let i = start; i <= end; i++) {
      this.daysInDecade.push(i)
    }
  }

  private getAvg(array: number[]) {
    const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return Math.round(sum / array.length)
  }
}
