import {Component} from '@angular/core';

@Component({
  selector: 'app-daily-reservoir',
  templateUrl: './ten-day-reservoir.component.html',
  styleUrls: ['./ten-day-reservoir.component.css']
})
export class TenDayReservoirComponent {


  today = new Date();
  yesterday = new Date(this.today).setDate(this.today.getDate() - 1);
  pastYear = this.today.getFullYear() - 1
  currentYear = this.today.getFullYear()
  decade = function (): number {
    const currentDate = new Date();
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

  // data = [{
  //   reservoir: 'Андижан',
  //   level: [879.88, 879.83],
  //   volume: [775.5, 774.1, 895.7, 490.5, 375.0],
  //   income: [56, 58, 57, 41, 41, 37],
  //   release: [75, 75, 100, 70, 70]
  // }, {
  //   reservoir: 'Охангаран',
  //   level: [1041.14, 1040.93],
  //   volume: [68.3, 67.7, 82.1, 62.7, 62.5],
  //   income: [1.1, 1.1, 1.2, 1.7, 0.5, 0.7],
  //   release: [8.0, 8.0, 10, 8, 9.5]
  // }, {
  //   reservoir: 'Сардоба',
  //   level: [281.32, 281.2],
  //   volume: [115.4, 112.7, 229.1, 119.1, 137.1],
  //   income: [0, 0, 0, 0, 0, 40],
  //   release: [30, 30, 55, 35, 40]
  // }, {
  //   reservoir: 'Хисорак',
  //   level: [1078.28, 1078.01],
  //   volume: [53.7, 53.2, 58.1, 43.4, 47.7],
  //   income: [5, 4.5, 4.7, 4.5, 4.1, 7],
  //   release: [10, 10, 8, 0, 5]
  // }, {
  //   reservoir: 'Тупаланг',
  //   level: [925.91, 925.73],
  //   volume: [264.5, 263.6, 64.2, 123.2, 228.8],
  //   income: [11.2, 11.2, 11.1, 10, 12, 14],
  //   release: [20, 20, 4, 24, 41]
  // }, {
  //   reservoir: 'Чарвак',
  //   level: [877.22, 877, 1],
  //   volume: [1524.6, 1521, 1557.2, 1228, 1267],
  //   income: [95, 96, 96, 92, 72.2, 87],
  //   release: [131, 141, 141, 126, 141]
  // }
  // ]

  difference = +0.5
}
