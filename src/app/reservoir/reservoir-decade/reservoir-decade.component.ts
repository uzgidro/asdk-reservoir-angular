import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {CategorisedValueResponse} from "../../shared/response/values-response";
import {DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {LoaderComponent} from "../../shared/component/loader/loader.component";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {UzbMonthPipePipe} from "../../shared/pipe/uzb-month-pipe.pipe";
import {
  DecadeManyYearsIncomeTableComponent
} from "./decade-many-years-income-table/decade-many-years-income-table.component";
import {CardWrapperComponent} from "../../shared/component/card-wrapper/card-wrapper.component";

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
        UzbMonthPipePipe,
        DecadeManyYearsIncomeTableComponent,
        CardWrapperComponent
    ]
})

export class ReservoirDecadeComponent implements OnInit {

  today = new Date();
  currentYear = this.today.getFullYear()
  daysInDecade: number[] = []
  tableData?: CategorisedValueResponse
  avgIncome?: number
  avgRelease?: number

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
  }

  private setDecade() {
    let start
    let end
    if (this.today.getDate() < 12) {
      start = 1
      end = 10
    } else if (this.today.getDate() >= 12 && this.today.getDate() < 22) {
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
