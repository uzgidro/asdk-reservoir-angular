import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Chart, ChartConfiguration, registerables} from "chart.js";
import {BaseChartDirective, NgChartsModule} from "ng2-charts";
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {ComplexValueResponse} from "../../shared/response/values-response";

@Component({
  selector: 'app-reservoir-analytics',
  standalone: true,
  imports: [
    NgChartsModule,
    NgForOf,
    DecimalPipe,
    CalendarModule,
    FormsModule,
    NgIf,
    NgStyle,
    NgClass,
    DatePipe
  ],
  templateUrl: './reservoir-analytics.component.html',
  styleUrl: './reservoir-analytics.component.css'
})
export class ReservoirAnalyticsComponent implements OnInit, AfterViewInit {

  reservoirId?: number
  reservoirName?: string
  tableHeight?: number
  mSecondsInDay = 0.0864

  protected years: YearValue[] = []

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
  today = new Date()

  // currentYear: YearValue = {year: this.today.getFullYear(), value: 1776}
  // currentYearData: number[] = []
  // currentYearValue = 0

  public chartDataset: any[] = []
  public chartLabels = ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авн.', 'Сент.', 'Окт.', 'Ноя.', 'Дек']

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
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
  @ViewChild('infoContainer') infoContainer?: ElementRef

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.reservoirId = value['reservoir']
        this.configureData(value['reservoir'])
      }
    })
    // let data: number[] = []
    // for (let i = 0; i < 12; i++) {
    //   let value = 0
    //   if (i < this.today.getMonth()) {
    //     value = this.currentYear.value * Math.floor(Math.random() * (this.randomCoefficient[i].max - this.randomCoefficient[i].min) + this.randomCoefficient[i].min) / 100
    //     this.currentYearValue += value
    //   }
    //   data.push(value)
    // }
    // this.currentYearData = data
    // this.lineChartData?.datasets.push({
    //   data: data.filter(item => item !== 0),
    //   label: `${this.currentYear.year}`,
    //   borderColor: 'rgba(13, 148, 136,1)',
    //   pointBackgroundColor: 'rgba(13, 148, 136,0.8)',
    //   pointBorderColor: 'rgba(13, 148, 136,1)',
    //   pointHoverBackgroundColor: 'rgba(13, 148, 136,0.8)',
    //   pointHoverBorderColor: '#fff',
    // })
    // this.chart?.update()
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
          if (this.chartDataset.length > 4) {
            this.chartDataset.pop()
          }
          this.selectedYearByMonth = response.data.map(value => value.value * this.mSecondsInDay)
          this.selectedYear = {
            year: new Date(response.data[0].date).getFullYear(),
            value: response.data
              .map(value => value.value)
              .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
          }
          this.chartDataset.push({
            data: this.selectedYearByMonth,
            label: `Данные за ${this.selectedYear.year}`,
            borderColor: 'rgba(147, 51, 234,1)',
            pointBackgroundColor: 'rgba(147, 51, 234,0.8)',
            pointBorderColor: 'rgba(147, 51, 234,1)',
            pointHoverBackgroundColor: 'rgba(147, 51, 234,0.8)',
            pointHoverBorderColor: '#fff',
          })
          this.chart?.update()
        }
      })
    }
  }

  private configureData(reservoirId: number) {
    if (this.chartDataset) {
      this.chartDataset = []
    }
    this.getByYears(reservoirId)
    this.getMax(reservoirId)
    this.getMin(reservoirId)
    this.getPastYear(reservoirId)
  }


  private getByYears(reservoirId: number) {
    this.api.getByYearValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        this.startYear = new Date(response.data[0].date)
        this.endYear = new Date(response.data[response.data.length - 1].date)
        this.years = response.data.flatMap(item => {
          return {year: new Date(item.date).getFullYear(), value: item.value * this.mSecondsInDay}
        })
        this.getAvg(reservoirId)
      }
    })
  }

  private getAvg(reservoirId: number) {
    this.api.getAvgValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        this.avgByMonth = response.data.map(value => value.value * this.mSecondsInDay)
        this.avgValue = response.data.map(value => value.value).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        this.chartDataset.push({
          data: this.avgByMonth,
          label: `Среднее за года (${this.startYear?.getFullYear()} - ${this.endYear?.getFullYear()})`,
          borderColor: 'rgba(37, 99, 235,0.4)',
          pointBackgroundColor: 'rgba(37, 99, 235,0.5)',
          pointBorderColor: 'rgba(37, 99, 235,0.4)',
          pointHoverBackgroundColor: 'rgba(37, 99, 235,0.2)',
          pointHoverBorderColor: '#fff',
        })
        this.chart?.update()
      }
    })
  }

  private getMin(reservoirId: number) {
    this.api.getMinValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        this.minByMonth = response.data.map(value => value.value * this.mSecondsInDay)
        this.minValue = {
          year: new Date(response.data[0].date).getFullYear(),
          value: response.data
            .map(value => value.value)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        }
        this.chartDataset.push({
          data: this.minByMonth,
          label: `Минимум ${this.minValue?.year}`,
          borderColor: 'rgba(225, 29, 72,0.4)',
          pointBackgroundColor: 'rgba(225, 29, 72,0.5)',
          pointBorderColor: 'rgba(225, 29, 72,0.4)',
          pointHoverBackgroundColor: 'rgba(225, 29, 72,0.8)',
          pointHoverBorderColor: '#fff',
        })
        this.chart?.update()
      }
    })
  }

  private getMax(reservoirId: number) {
    this.api.getMaxValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        this.maxByMonth = response.data.map(value => value.value * this.mSecondsInDay)
        this.maxValue = {
          year: new Date(response.data[0].date).getFullYear(),
          value: response.data
            .map(value => value.value)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        }
        this.chartDataset.push({
          data: this.maxByMonth,
          label: `Максимум ${this.maxValue?.year}`,
          borderColor: 'rgba(22, 163, 74,0.4)',
          pointBackgroundColor: 'rgba(22, 163, 74,0.5)',
          pointBorderColor: 'rgba(22, 163, 74,0.4)',
          pointHoverBackgroundColor: 'rgba(22, 163, 74,0.8)',
          pointHoverBorderColor: '#fff',
        })
        this.chart?.update()
      }
    })
  }


  private getPastYear(reservoirId: number) {
    this.api.getSelectedYearValues(reservoirId, new Date().getFullYear() - 1).subscribe({
      next: (response: ComplexValueResponse) => {
        this.pastYearByMonth = response.data.map(value => value.value * this.mSecondsInDay)
        this.pastYear = {
          year: new Date(response.data[0].date).getFullYear(),
          value: response.data
            .map(value => value.value)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        }
        this.chartDataset.push({
          data: this.pastYearByMonth,
          label: `Данные за прошлый ${this.pastYear.year}`,
          borderColor: 'rgba(217, 119, 6,0.4)',
          pointBackgroundColor: 'rgba(217, 119, 6,0.5)',
          pointBorderColor: 'rgba(217, 119, 6,0.4)',
          pointHoverBackgroundColor: 'rgba(217, 119, 6,0.2)',
          pointHoverBorderColor: '#fff',
        })
        this.chart?.update()
      }
    })
  }

}

interface YearValue {
  year: number
  value: number
}
