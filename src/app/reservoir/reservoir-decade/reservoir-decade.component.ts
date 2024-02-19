import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {CategorisedValueResponse, ComplexValueResponse} from "../../shared/response/values-response";
import {ReservoirResponse} from "../../shared/response/reservoir-response";

@Component({
  selector: 'app-reservoir-decade',
  templateUrl: './reservoir-decade.component.html',
  styleUrls: ['./reservoir-decade.component.css']
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
  reservoirName?: string
  totalValues: {
    reservoir: string
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
        this.api.getReservoirById(reservoir).subscribe({
          next: (response: ReservoirResponse) => {
            this.reservoirName = response.name
          }
        })
        this.api.getDecadeReservoirValues(reservoir).subscribe({
          next: (response: CategorisedValueResponse) => {
            this.reservoirName = response.income.reservoir
            this.tableData = response
            this.avgIncome = this.getAvg(this.tableData.income.data.map(item => item.value))
            this.avgRelease = this.getAvg(this.tableData.release.data.map(item => item.value))
          }
        })
        // TODO(): refactor after connect realtime DB
        this.api.getTotalDecadeReservoirValues().subscribe({
          next: (response: ComplexValueResponse[]) => {
            for (let item of response) {
              const current = item.data.find(
                value => new Date(value.date).getFullYear() === new Date().getFullYear() - 1
              )?.value

              const data = item.data.filter(
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
              this.totalValues.push({
                reservoir: item.reservoir,
                currentYear: current,
                lastYear: lastYear,
                avg10: data10,
                avg30: data30,
              })
            }
          }
        })
      }
    })
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
