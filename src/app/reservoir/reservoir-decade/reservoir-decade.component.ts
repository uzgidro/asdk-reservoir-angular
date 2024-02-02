import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EnvService} from "../../shared/service/env.service";
import {RegionInfo} from "../../../environments/environment.development";
import {ReservoirService} from "../reservoir.service";

@Component({
  selector: 'app-reservoir-decade',
  templateUrl: './reservoir-decade.component.html',
  styleUrls: ['./reservoir-decade.component.css']
})
export class ReservoirDecadeComponent implements OnInit {


  today = new Date();
  limitDay: any
  pastYear = this.today.getFullYear() - 1
  currentYear = this.today.getFullYear()
  decade = this.calculateDecade()
  daysInDecade: number[] = []
  avgIncome?: number
  avgRelease?: number
  reservoir?: RegionInfo

  data = [
    {
      reservoir: 'Андижан',
      thirtyYears: 3701,
      tenYears: 3192,
      pastYear: 4088,
      currentYear: 3190.8
    },
    {
      reservoir: 'Охангаран',
      thirtyYears: 751.8,
      tenYears: 672.4,
      pastYear: 746.9,
      currentYear: 636.4
    },
    {
      reservoir: 'Сардоба',
      thirtyYears: 0,
      tenYears: 0,
      pastYear: 1749.3,
      currentYear: 1327.2
    },
    {
      reservoir: 'Хисорак',
      thirtyYears: 367.4,
      tenYears: 378.3,
      pastYear: 321.8,
      currentYear: 351.7
    },
    {
      reservoir: 'Тупаланг',
      thirtyYears: 1790.2,
      tenYears: 1630.1,
      pastYear: 1369.5,
      currentYear: 1395.6
    },
    {
      reservoir: 'Чарвак',
      thirtyYears: 6788,
      tenYears: 6447.2,
      pastYear: 6069,
      currentYear: 5937
    }
  ]

  constructor(private activatedRoute: ActivatedRoute, private env: EnvService, private resService: ReservoirService) {
  }

  ngOnInit() {
    this.setDecade()
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.reservoir = this.resService.setReservoir(value, this.env.getRegions())
        this.getAvg()
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

    return resultDate;
  }

  private setDecade() {
    let start
    let end
    if (this.today.getDate() < 11) {
      this.limitDay = this.today.getDate()
      start = 1
      end = 10
    } else if (this.today.getDate() >= 11 && this.today.getDate() < 21) {
      this.limitDay = this.today.getDate() - 10
      start = 11
      end = 20
    } else {
      this.limitDay = this.today.getDate() - 20
      start = 21
      end = new Date(this.currentYear, this.today.getMonth(), 0).getDate()
    }
    for (let i = start; i <= end; i++) {
      this.daysInDecade.push(i)
    }
  }

  private getAvg() {
    const res = this.reservoir
    const count = this.limitDay
    let sumIncome = 0, sumRelease = 0
    if (res) {
      for (let i = 0; i < count; i++) {
        sumIncome += res.waterIncome[i]
        sumRelease += res.waterRelease[i]
      }
      this.avgIncome = sumIncome / count
      this.avgRelease = sumRelease / count
    }
  }

}
