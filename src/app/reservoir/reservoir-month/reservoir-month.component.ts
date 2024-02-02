import {Component, OnInit} from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {RegionInfo} from "../../../environments/environment.development";
import {ActivatedRoute} from "@angular/router";
import {EnvService} from "../../shared/service/env.service";
import {ReservoirService} from "../reservoir.service";
import {RusMonthPipe} from "../../shared/pipe/rus-month.pipe";

@Component({
  selector: 'app-reservoir-month',
  standalone: true,
  imports: [
    CalendarModule,
    NgForOf,
    DatePipe,
    RusMonthPipe,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './reservoir-month.component.html',
  styleUrl: './reservoir-month.component.css'
})
export class ReservoirMonthComponent implements OnInit {
  reservoir?: RegionInfo
  months: Date[] = []
  data: {
    date: Date
    tenDays: number[]
    elevenDays: number[]
    firstDecadeLimit: number
    secondDecadeLimit: number
    thirdDecadeLimit: number
  }[] = []

  constructor(private activatedRoute: ActivatedRoute, private env: EnvService, private resService: ReservoirService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.reservoir = this.resService.setReservoir(value, this.env.getRegions())
      }
    })
    this.setupMonths()
    this.setupData()
  }

  private setupMonths() {
    for (let i = 0; i < 12; i++) {
      this.months.push(new Date(new Date().getFullYear(), i))
    }
  }

  getAvg(array: number[], limit: number) {
    let sum = 0
    for (let i = 0; i < limit; i++) {
      sum += array[i]
    }
    if (sum / limit) {
    return sum / limit
    } else {
      return ''
    }
  }

  private setupData() {
    const today = new Date()

    let month: Date
    let tenDays = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let elevenDays = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


    for (let i = 0; i < 12; i++) {
      let firstDecadeLimit = 0
      let secondDecadeLimit = 0
      let thirdDecadeLimit = 0
      month = new Date(new Date().getFullYear(), i)
      if (month.getMonth() < today.getMonth()) {
        const date = month.setFullYear(new Date().getFullYear(), i+1, 0)
        firstDecadeLimit = 10
        secondDecadeLimit = 10
        thirdDecadeLimit = new Date(date).getDate() - 20
      } else if (month.getMonth() === today.getMonth()) {
        if (today.getDate() < 11) {
          firstDecadeLimit = today.getDate()
        } else if (today.getDate() < 21) {
          firstDecadeLimit = 10
          secondDecadeLimit = today.getDate() - 10
        } else {
          firstDecadeLimit = 10
          secondDecadeLimit = 10
          thirdDecadeLimit = today.getDate() - 20
        }
      }
    this.data.push({
      date: month!!,
      tenDays: tenDays,
      elevenDays: elevenDays,
      firstDecadeLimit: firstDecadeLimit,
      secondDecadeLimit: secondDecadeLimit,
      thirdDecadeLimit: thirdDecadeLimit
    })
      if (month.getMonth() === today.getMonth()) {
        break
      }
    }

  }
}
