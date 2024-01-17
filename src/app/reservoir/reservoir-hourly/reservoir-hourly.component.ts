import {Component, OnInit} from '@angular/core';
import {EnvService} from "../../shared/service/env.service";
import {ChartConfiguration} from "chart.js";
import {RegionInfo} from "../../../environments/environment.development";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-reservoir-hourly',
  templateUrl: './reservoir-hourly.component.html',
  styleUrls: ['./reservoir-hourly.component.css']
})
export class ReservoirHourlyComponent implements OnInit{
  selectedDate = new Date()
  times: Date[] = []
  reservoirs = this.env.getRegions()
  queryReservoir? : RegionInfo
  data: { data: ChartConfiguration['data'], options: ChartConfiguration['options']}[] = []
  categories: {name: string, type: string}[] = [
    {name: 'Приток', type: 'м3/с'},
    {name: 'Попуск', type: 'м3/с'},
    {name: 'Уровень', type: 'с'},
    {name: 'Объём', type: 'млн. м3'}
  ]

  constructor(private env: EnvService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  async ngOnInit() {
    this.setInfoTime()

    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.queryReservoir = this.reservoirs.find(region => value['reservoir'] === region.id)
        if (this.queryReservoir) {
          this.setData()
        } else {
          this.router.navigate(['/not-found'])
        }
      }
    })
  }

  private setData() {
    let count = 0
    let data: number[]
    for (const item of this.categories) {
      if (item.name === 'Приток') {
        data = this.queryReservoir?.waterIncome!!
      } else if (item.name === 'Попуск') {
        data = this.queryReservoir?.waterRelease!!
      } else if (item.name === 'Уровень') {
        data = this.queryReservoir?.waterLevel!!
      } else {
        data = this.queryReservoir?.waterVolume!!
      }
        this.data[count++] = {
        data: {
          datasets: [
            {
              data: data,
              label: item.name + ' ' + item.type,
              backgroundColor: 'rgba(148,159,177,0.2)',
              borderColor: 'rgb(59, 130, 246)',
              pointBorderColor: '#fff',
              pointHoverBorderColor: 'white',
              pointBackgroundColor: 'rgb(59, 130, 246)'
            }
          ],
          labels: this.env.getDataLabels(),
        },
        options: {
          elements: {
            line: {
              tension: 0.5,
            },
          },
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {display: false},
            title: {
              display: true,
              position: "top",
              align: "start",
              text: item.name
            }
          }
        }
      }
    }
  }

  private setInfoTime() {
    const currentTime = new Date().getHours();
    let currentMonth = new Date().getMonth()
    let currentDate = new Date().getDate()
    let currentYear = new Date().getFullYear()

    let roundedTime: number;

    if (currentTime % 2 == 0) {
      roundedTime = currentTime
    } else {
      roundedTime = currentTime - 1
    }

    for (let i = 0; i <= 5; i++) {
      this.times.push(new Date(currentYear, currentMonth, currentDate, roundedTime))
      roundedTime -= 2
    }
  }
}
