import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart, ChartConfiguration, registerables} from "chart.js";
import {BaseChartDirective, NgChartsModule} from "ng2-charts";
import {DecimalPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-reservoir-analytics',
  standalone: true,
  imports: [
    NgChartsModule,
    NgForOf,
    DecimalPipe
  ],
  templateUrl: './reservoir-analytics.component.html',
  styleUrl: './reservoir-analytics.component.css'
})
export class ReservoirAnalyticsComponent implements OnInit {

  private readonly years: YearValue[] = [
    {year: 1993, value: 2346},
    {year: 1994, value: 2233},
    {year: 1995, value: 1575},
    {year: 1996, value: 1613},
    {year: 1997, value: 1671},
    {year: 1998, value: 2596},
    {year: 1999, value: 1799},
    {year: 2000, value: 1282},
    {year: 2001, value: 1151},
    {year: 2002, value: 2562},
    {year: 2003, value: 2484},
    {year: 2004, value: 2099},
    {year: 2005, value: 2245},
    {year: 2006, value: 1783},
    {year: 2007, value: 1709},
    {year: 2008, value: 1284},
    {year: 2009, value: 2008},
    {year: 2010, value: 1893},
    {year: 2011, value: 1245},
    {year: 2012, value: 1810},
    {year: 2013, value: 1400},
    {year: 2014, value: 1522},
    {year: 2015, value: 1948},
    {year: 2016, value: 1921},
    {year: 2017, value: 1583},
    {year: 2018, value: 1358},
    {year: 2019, value: 2269},
    {year: 2020, value: 1816},
    {year: 2021, value: 1116},
    {year: 2022, value: 1376},
    {year: 2023, value: 1368}
  ]

  private readonly avgCoefficient = [1.9, 2.1, 5.4, 13.7, 21.3, 22.2, 15.4, 7.5, 3.7, 2.5, 2.3, 2]
  private readonly minCoefficient = [3, 2.6, 5.1, 12.4, 25.8, 23, 11.9, 6.3, 3.9, 2.5, 1.9, 1.9]
  private readonly maxCoefficient = [1.2, 2, 2.9, 16.2, 18.8, 19.6, 19.8, 9.1, 4.2, 2.9, 2.2, 1]
  private readonly pastYearCoefficient = [1.4,1.5,8.1,18.3,23.3,18.8,13.4,5.2,3.3,2.1,3.1,1.6]

  filteredYears: { year: number, value: number }[] = []
  startYear = 1993
  endYear = 2023
  pastYear?: YearValue
  avgValue?: number
  minValue?: YearValue
  maxValue?: YearValue
  avgByMonth: number[] = []
  minByMonth: number[] = []
  maxByMonth: number[] = []
  pastYearByMonth: number[] = []

  public lineChartData?: ChartConfiguration['data']

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {display: true},
      title: {
        display: true,
        text: 'Приток воды, млн. м3'
      }
    }
  }

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.filteredYears = this.filter()
    this.getAvg()
    this.getMax()
    this.getMin()
    this.getAvgByMonth()
    this.getMinByMonth()
    this.getMaxByMonth()
    this.getPastYearByMonth()
    this.pastYear = this.years[this.years.length-1]
    this.setupChart()
    console.log(this.minValue)
    console.log(this.maxValue)
  }

  private filter(start?: number, end?: number) {
    if (!start || !end) {
      return this.years
    }
    return this.years.filter(item => item.year >= start && item.year <= end)
  }

  private getAvg() {
    const sumOfValues = this.filteredYears.reduce((sum, obj) => sum + obj.value, 0);
    this.avgValue = sumOfValues / this.filteredYears.length;
  }

  private getMin() {
    this.minValue = this.filteredYears.reduce((min, obj) => (obj.value < min.value ? obj : min), this.filteredYears[0]);
  }

  private getMax() {
    this.maxValue = this.filteredYears.reduce((max, obj) => (obj.value > max.value ? obj : max), this.filteredYears[0]);
  }

  private getAvgByMonth() {
    if (this.avgValue)
      for (let i = 0; i < 12; i++) {
        this.avgByMonth[i] = this.avgValue * this.avgCoefficient[i] / 100
      }
  }

  private getMaxByMonth() {
    if (this.maxValue)
      for (let i = 0; i < 12; i++) {
        this.maxByMonth[i] = this.maxValue.value * this.maxCoefficient[i] / 100
      }
  }

  private getMinByMonth() {
    if (this.minValue)
      for (let i = 0; i < 12; i++) {
        this.minByMonth[i] = this.minValue.value * this.minCoefficient[i] / 100
      }
  }

  private getPastYearByMonth() {
    if (this.endYear)
      for (let i = 0; i < 12; i++) {
        this.pastYearByMonth[i] = this.years[this.years.length-1].value * this.pastYearCoefficient[i] / 100
      }
  }

  private setupChart() {
    this.lineChartData = {
      datasets: [
        {
          data: this.minByMonth,
          label: `Минимум ${this.minValue?.year}`,
          backgroundColor: 'rgba(22, 163, 74,0.2)',
          borderColor: 'rgba(22, 163, 74,1)',
          pointBackgroundColor: 'rgba(22, 163, 74,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(22, 163, 74,0.8)',
          fill: 'origin',
        },
        {
          data: this.avgByMonth,
          label: `Среднее за года (${this.startYear} - ${this.endYear})`,
          backgroundColor: 'rgba(37, 99, 235,0.2)',
          borderColor: 'rgba(37, 99, 235,1)',
          pointBackgroundColor: 'rgba(37, 99, 235,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(37, 99, 235,0.2)',
          fill: 'origin',
        },
        {
          data: this.pastYearByMonth,
          label: `Данные за прошлый ${this.years[this.years.length-1].year}`,
          backgroundColor: 'rgba(225, 29, 72,0.2)',
          borderColor: 'rgba(225, 29, 72,1)',
          pointBackgroundColor: 'rgba(225, 29, 72,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(225, 29, 72,0.8)',
          fill: 'origin',
        },
        {
          data: this.maxByMonth,
          label: `Максимум ${this.maxValue?.year}`,
          backgroundColor: 'rgba(217, 119, 6,0.2)',
          borderColor: 'rgba(217, 119, 6,1)',
          pointBackgroundColor: 'rgba(217, 119, 6,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(217, 119, 6,0.2)',
          fill: 'origin',
        },
      ],
      labels: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авн.', 'Сент.', 'Окт.', 'Ноя.', 'Дек'],
    };
  }

}

interface YearValue {
  year: number
  value: number
}
