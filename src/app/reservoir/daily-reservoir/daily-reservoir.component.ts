import {Component} from '@angular/core';

@Component({
  selector: 'app-daily-reservoir',
  templateUrl: './daily-reservoir.component.html',
  styleUrls: ['./daily-reservoir.component.css']
})
export class DailyReservoirComponent {
  today = new Date();
  yesterday = new Date(this.today).setDate(this.today.getDate() - 1);
  years = [this.today.getFullYear() - 3, this.today.getFullYear() - 2, this.today.getFullYear() - 1]

  data = [{
    reservoir: 'Андижан',
    level: [879.88, 879.83],
    volume: [775.5, 774.1, 895.7, 490.5, 375.0],
    income: [56, 58, 57, 41, 41, 37],
    release: [75, 75, 100, 70, 70]
  }, {
    reservoir: 'Охангаран',
    level: [1041.14, 1040.93],
    volume: [68.3, 67.7, 82.1, 62.7, 62.5],
    income: [1.1, 1.1, 1.2, 1.7, 0.5, 0.7],
    release: [8.0, 8.0, 10, 8, 9.5]
  }, {
    reservoir: 'Сардоба',
    level: [281.32, 281.2],
    volume: [115.4, 112.7, 229.1, 119.1, 137.1],
    income: [0, 0, 0, 0, 0, 40],
    release: [30, 30, 55, 35, 40]
  }, {
    reservoir: 'Хисорак',
    level: [1078.28, 1078.01],
    volume: [53.7, 53.2, 58.1, 43.4, 47.7],
    income: [5, 4.5, 4.7, 4.5, 4.1, 7],
    release: [10, 10, 8, 0, 5]
  }, {
    reservoir: 'Тупаланг',
    level: [925.91, 925.73],
    volume: [264.5, 263.6, 64.2, 123.2, 228.8],
    income: [11.2, 11.2, 11.1, 10, 12, 14],
    release: [20, 20, 4, 24, 41]
  }, {
    reservoir: 'Чарвак',
    level: [877.22, 877, 1],
    volume: [1524.6, 1521, 1557.2, 1228, 1267],
    income: [95, 96, 96, 92, 72.2, 87],
    release: [131, 141, 141, 126, 141]
  }
  ]

  difference = +0.5
}
