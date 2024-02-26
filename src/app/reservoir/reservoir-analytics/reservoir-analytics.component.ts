import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Chart, ChartConfiguration, registerables} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {ComplexValueResponse, ValueResponse} from "../../shared/response/values-response";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-reservoir-analytics',
  templateUrl: './reservoir-analytics.component.html',
  styleUrl: './reservoir-analytics.component.css'
})
export class ReservoirAnalyticsComponent implements OnInit, AfterViewInit {

  private mSecondsInDay = 0.0864
  protected years: YearValue[] = []

  private _incomeChart: {
    id: string
    data: any
  }[] = []

  get incomeChart() {
    return this._incomeChart.map(item => item.data);
  }

  reservoirId?: number
  reservoirName?: string
  tableHeight?: number
  category = 'income'


  startYear?: Date
  endYear?: Date
  pastYear?: YearValue
  avgValue?: number
  minValue?: YearValue
  maxValue?: YearValue
  avgByMonth: number[] = []
  minByMonth: number[] = []
  maxByMonth: number[] = []
  pastYearByMonth: number[] = []
  selectedYear?: YearValue
  selectedYearByMonth?: number[] = []
  subscribes: Subscription[] = []

  incomeChartLabels = ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Ноя.', 'Дек.']
  chartOptions: ChartConfiguration['options'] = {
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
      legend: {display: true},
      title: {
        display: true,
        text: 'Приток воды, млн. м3'
      }
    }
  }

  volumeChartDataset: any[] = []
  volumeChartLabels: number[] = []


  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild('infoContainer') infoContainer?: ElementRef

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.api.getReservoirById(value['reservoir']).subscribe({
          next: (response: ReservoirResponse) => {
            this.reservoirId = response.id
            this.reservoirName = response.name
          }
        })
        this.configureData(value['reservoir'])
      }
    })
  }

  ngAfterViewInit() {
    setTimeout(() =>
      this.tableHeight = this.infoContainer?.nativeElement.offsetHeight
    )
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.tableHeight !== this.infoContainer?.nativeElement.offsetHeight) {
      this.tableHeight = this.infoContainer?.nativeElement.offsetHeight
    }
  }

  yearSelect(yearValue: YearValue) {
    if (this.reservoirId) {
      this.api.getSelectedYearValues(this.reservoirId, yearValue.year).subscribe({
        next: (response: ComplexValueResponse) => {
          if (this._incomeChart.length > 4) {
            this._incomeChart.pop()
          }
          this.selectedYearByMonth = this.calculateMonthlyValues(response)
          this.selectedYear = {
            year: this.getResponseYear(response),
            value: this.calculateMonthlySum(response)
          }
          this._incomeChart.push({
            id: yearValue.year.toString(),
            data: {
              data: this.selectedYearByMonth,
              label:
                `Данные за ${this.selectedYear.year}`,
              borderColor:
                'rgba(147, 51, 234,1)',
              pointBackgroundColor:
                'rgba(147, 51, 234,0.8)',
              pointBorderColor:
                'rgba(147, 51, 234,1)',
              pointHoverBackgroundColor:
                'rgba(147, 51, 234,0.8)',
              pointHoverBorderColor:
                '#fff',
            }
          })
          this.chart?.update()
        }
      })
    }
  }

  changeCategory(category: string) {
    this.category = category
  }

  private configureData(reservoirId: number) {
    if (this._incomeChart) {
      this._incomeChart = []
    }
    for (let sub of this.subscribes) {
      sub.unsubscribe()
    }
    this.getByYears(reservoirId)
    this.getMax(reservoirId)
    this.getMin(reservoirId)
    this.getPastYear(reservoirId)
  }


  private getByYears(reservoirId: number) {
    this.subscribes.push(this.api.getByYearValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        this.startYear = new Date(response.data[0].date)
        this.endYear = new Date(response.data[response.data.length - 1].date)
        this.years = response.data.flatMap(item => {
          return {year: new Date(item.date).getFullYear(), value: this.calculateVolume(item)}
        })

        this.volumeChartLabels = response.data.map(item => new Date(item.date).getFullYear())
        this.volumeChartDataset[0] = {
          data: this.calculateMonthlyValues(response),
          label: `Приток воды, млн. м3`,
          borderColor: 'rgba(37, 99, 235,0.4)',
          pointBackgroundColor: 'rgba(37, 99, 235,0.5)',
          pointBorderColor: 'rgba(37, 99, 235,0.4)',
          pointHoverBackgroundColor: 'rgba(37, 99, 235,0.2)',
          pointHoverBorderColor: '#fff',
        }
        this.getAvg(reservoirId)
      }
    }))
  }

  private getAvg(reservoirId: number) {
    this.subscribes.push(this.api.getAvgValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        this.avgByMonth = this.calculateMonthlyValues(response)
        this.avgValue = this.calculateMonthlySum(response)
        this._incomeChart.push({
          id: 'avg',
          data: {
            data: this.avgByMonth,
            label: `Среднее за года (${this.startYear?.getFullYear()} - ${this.endYear?.getFullYear()})`,
            borderColor: 'rgba(37, 99, 235,0.4)',
            pointBackgroundColor: 'rgba(37, 99, 235,0.5)',
            pointBorderColor: 'rgba(37, 99, 235,0.4)',
            pointHoverBackgroundColor: 'rgba(37, 99, 235,0.2)',
            pointHoverBorderColor: '#fff',
          }
        })
        this.chart?.update()
      }
    }))
  }

  private getMin(reservoirId: number) {
    this.subscribes.push(this.api.getMinValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        this.minByMonth = this.calculateMonthlyValues(response)
        this.minValue = {
          year: this.getResponseYear(response),
          value: this.calculateMonthlySum(response)
        }
        this._incomeChart.push({
          id: 'min',
          data: {
            data: this.minByMonth,
            label: `Минимум ${this.minValue?.year}`,
            borderColor: 'rgba(225, 29, 72,0.4)',
            pointBackgroundColor: 'rgba(225, 29, 72,0.5)',
            pointBorderColor: 'rgba(225, 29, 72,0.4)',
            pointHoverBackgroundColor: 'rgba(225, 29, 72,0.8)',
            pointHoverBorderColor: '#fff',
          }
        })
        this.chart?.update()
      }
    }))
  }

  private getMax(reservoirId: number) {
    this.subscribes.push(this.api.getMaxValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        this.maxByMonth = this.calculateMonthlyValues(response)
        this.maxValue = {
          year: this.getResponseYear(response),
          value: this.calculateMonthlySum(response)
        }
        this._incomeChart.push({
          id: 'max',
          data: {
            data: this.maxByMonth,
            label: `Максимум ${this.maxValue?.year}`,
            borderColor: 'rgba(22, 163, 74,0.4)',
            pointBackgroundColor: 'rgba(22, 163, 74,0.5)',
            pointBorderColor: 'rgba(22, 163, 74,0.4)',
            pointHoverBackgroundColor: 'rgba(22, 163, 74,0.8)',
            pointHoverBorderColor: '#fff',
          }
        })
        this.chart?.update()
      }
    }))
  }


  private getPastYear(reservoirId: number) {
    this.subscribes.push(this.api.getSelectedYearValues(reservoirId, new Date().getFullYear() - 1).subscribe({
      next: (response: ComplexValueResponse) => {
        this.pastYearByMonth = this.calculateMonthlyValues(response)
        this.pastYear = {
          year: this.getResponseYear(response),
          value: this.calculateMonthlySum(response)
        }
        this._incomeChart.push({
          id: 'past',
          data: {
            data: this.pastYearByMonth,
            label: `Данные за прошлый ${this.pastYear.year}`,
            borderColor: 'rgba(217, 119, 6,0.4)',
            pointBackgroundColor: 'rgba(217, 119, 6,0.5)',
            pointBorderColor: 'rgba(217, 119, 6,0.4)',
            pointHoverBackgroundColor: 'rgba(217, 119, 6,0.2)',
            pointHoverBorderColor: '#fff',
          }
        })
        this.chart?.update()
      }
    }))
  }

  private getResponseYear(response: ComplexValueResponse) {
    return new Date(response.data[0].date).getFullYear()
  }

  private calculateMonthlySum(response: ComplexValueResponse) {
    return this.calculateMonthlyValues(response)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  }

  private calculateMonthlyValues(response: ComplexValueResponse) {
    return response.data.map(value => this.calculateVolume(value))
  }

  private calculateVolume(value: ValueResponse) {
    return Math.round(value.value * this.mSecondsInDay)
  }

}

interface YearValue {
  year: number
  value: number
}
