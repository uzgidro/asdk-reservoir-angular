import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-reservoir-hourly',
  templateUrl: './reservoir-hourly.component.html',
  styleUrls: ['./reservoir-hourly.component.css']
})
export class ReservoirHourlyComponent implements OnInit{
  times: Date[] = []
  reservoirs = [
    {
      name: 'Андижан',
      weather: ['Ясно', 'Облачно'],
      level: [885.32, 885.33],
      volume: [944.6, 944.9],
      income: [65, 76, 75, 80, 80, 76],
      release: 80
    },
    {
      name: 'Охангаран',
      weather: ['Ясно', 'Ясно'],
      level: [1043.16, 1043.22],
      volume: [74, 74.2],
      income: [1.7, 3.1, 4.4, 4.4, 4.0, 2.8],
      release: 10
    },
    {
      name: 'Сардоба',
      weather: ['Облачно', 'Облачно'],
      level: [885.32, 885.33],
      volume: [281.20, 281.20],
      income: [0, 0, 0, 0, 0, 0],
      release: 30
    },
    {
      name: 'Хисорак',
      weather: ['Осадки', 'Облачно'],
      level: [1077.95, 1078.01],
      volume: [53.1, 53.2],
      income: [5.3, 4.5, 4.4, 4.5, 5.0, 5.0],
      release: 10
    },
    {
      name: 'Тупаланг',
      weather: ['Осадки', 'Осадки'],
      level: [925.67, 925.73],
      volume: [263.2, 263.6],
      income: [11.2, 11.1, 11.1, 11.1, 11.2, 11.2],
      release: 20
    },
    {
      name: 'Чарвак',
      weather: ['Ясно', 'Осадки'],
      level: [877.04, 877.10],
      volume: [1519.3, 1521],
      income: [96,96,96,100,95,95],
      release: 224
    },

  ]

  async ngOnInit() {
    this.setInfoTime()
  }

  private setInfoTime() {
    const currentTime = new Date().getHours();
    let currentMonth = new Date().getMonth()
    let currentDate = new Date().getDate()
    let currentYear = new Date().getFullYear()

    let roundedTime: number;

    if (currentTime >= 0 && currentTime < 6) {
      roundedTime = 0;
    } else if (currentTime >= 6 && currentTime < 12) {
      roundedTime = 6;
    } else if (currentTime >= 12 && currentTime < 18) {
      roundedTime = 12;
    } else {
      roundedTime = 18;
    }

    for (let i = 0; i <= 5; i++) {
      this.times.push(new Date(currentYear, currentMonth, currentDate, roundedTime))
      roundedTime -= 6
      if (roundedTime < 0) {
        roundedTime = 18
        if (currentDate == 1) {
          currentDate -= 1
          currentMonth -= 1
        } else {
          currentDate -= 1
        }
      }
    }
  }
}
