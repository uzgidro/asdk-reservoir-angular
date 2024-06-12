import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Chart, ChartConfiguration, registerables} from "chart.js";
import {BaseChartDirective, NgChartsModule} from "ng2-charts";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {ComplexValueResponse, ValueResponse} from "../../shared/response/values-response";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {Subscription} from "rxjs";
import {DecimalPipe, NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-reservoir-analytics',
  templateUrl: './reservoir-analytics.component.html',
  styleUrl: './reservoir-analytics.component.css',
  imports: [
    NgChartsModule,
    NgClass,
    NgStyle,
    NgForOf,
    NgIf,
    DecimalPipe
  ],
  standalone: true
})
export class ReservoirAnalyticsComponent implements OnInit, AfterViewInit {
hideColor(_t172: { year: number; value: number; }) {
throw new Error('Method not implemented.');
}


  protected mSecondsInDay = 0.0864
  protected years: YearValue[] = []
  private colors: { main: string, sub: string }[] = [
    {
      main: 'rgba(220, 38, 38,1)',
      sub: 'rgba(220, 38, 38,0.8)'
    },
    {
      main: 'rgba(234, 88, 12,1)',
      sub: 'rgba(234, 88, 12,0.8)'
    },
    {
      main: 'rgba(202, 138, 4,1)',
      sub: 'rgba(202, 138, 4,0.8)'
    },
    {
      main: 'rgba(101, 163, 13,1)',
      sub: 'rgba(101, 163, 13,0.8)'
    },
    {
      main: 'rgba(5, 150, 105,1)',
      sub: 'rgba(5, 150, 105,0.8)'
    },
    {
      main: 'rgba(13, 148, 136,1)',
      sub: 'rgba(13, 148, 136,0.8)'
    },
    {
      main: 'rgba(8, 145, 178,1)',
      sub: 'rgba(8, 145, 178,0.8)'
    },
    {
      main: 'rgba(2, 132, 199,1)',
      sub: 'rgba(2, 132, 199,0.8)'
    },
    {
      main: 'rgba(79, 70, 229,1)',
      sub: 'rgba(79, 70, 229,0.8)'
    },
    {
      main: 'rgba(124, 58, 237,1)',
      sub: 'rgba(124, 58, 237,0.8)'
    },
    {
      main: 'rgba(192, 38, 211,1)',
      sub: 'rgba(192, 38, 211,0.8)'
    },
    {
      main: 'rgba(219, 39, 119,1)',
      sub: 'rgba(219, 39, 119,0.8)'
    }
  ]
  private colorsCounter = 0

  private _incomeChart: {
    id: string
    data: any
    year?: YearValue
    valuesByMonth: number[]
    avgValue?: number
    color?: string
    display: boolean
  }[] = []

  get displayCharts() {
    return this._incomeChart.filter(i => i.display)
  }

  get incomeChart() {
    return this.displayCharts.map(item => item.data);
  }

  get avg() {
    const exists = this._incomeChart.find(item => item.id.includes('avg'))
    if (exists && exists.avgValue) {
      const item: Values = {
        id: exists.id,
        value: exists.avgValue,
        byMonth: exists.valuesByMonth,
        display: exists.display
      }
      return item
    }
    return
  }

  get tenAvg() {
    const exists = this._incomeChart.find(item => item.id.includes('tenAvg'))
    if (exists && exists.avgValue) {
      const item: Values = {
        id: exists.id,
        value: exists.avgValue,
        byMonth: exists.valuesByMonth,
        display: exists.display
      }
      return item
    }
    return
  }

  get min() {
    const exists = this._incomeChart.find(item => item.id.includes('min'))
    if (exists && exists.year) {
      const item: Values = {
        id: exists.id,
        value: exists.year.value,
        byMonth: exists.valuesByMonth,
        year: exists.year.year,
        display: exists.display
      }
      return item
    }
    return
  }

  get max() {
    const exists = this._incomeChart.find(item => item.id.includes('max'))
    if (exists && exists.year) {
      const item: Values = {
        id: exists.id,
        value: exists.year.value,
        byMonth: exists.valuesByMonth,
        year: exists.year.year,
        display: exists.display
      }
      return item
    }
    return
  }

  get past() {
    const exists = this._incomeChart.find(item => item.id.includes('past'))
    if (exists && exists.year) {
      const item: Values = {
        id: exists.id,
        value: exists.year.value,
        byMonth: exists.valuesByMonth,
        year: exists.year.year,
        display: exists.display
      }
      return item
    }
    return
  }

  get current() {
    const exists = this._incomeChart.find(item => item.id.includes('current'))
    if (exists && exists.year) {
      const item: Values = {
        id: exists.id,
        value: exists.year.value,
        byMonth: exists.valuesByMonth,
        year: exists.year.year,
        display: exists.display
      }
      return item
    }
    return
  }

  get selected() {
    const exists = this.displayCharts.filter(
      item =>
        !item.id.includes('tenAvg') &&
        !item.id.includes('past') &&
        !item.id.includes('min') &&
        !item.id.includes('max') &&
        !item.id.includes('current') &&
        !item.id.includes('avg'))
    if (exists.length > 0) {
      let map: Values[] = exists.map(item => ({
        id: item.id,
        value: item.year ? item.year.value : 0,
        byMonth: item.valuesByMonth,
        year: item.year ? item.year.year : 0,
        color: item.color ? item.color : '',
        display: item.display
      }));
      return map
    }
    return
  }

  reservoirId?: number
  reservoirName?: string
  tableHeight?: number
  category = 'income'

  firstHalf: { year: number, value: number }[] = [];
  secondHalf: { year: number, value: number }[] = [];


  startYear?: Date
  endYear?: Date
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
      legend: {display:false},
      title: {
        display: true,
        text: 'Приток воды, млн. м3'
      }
    }
  }

  volumeChartDataset: any[] = []
  volumeChartLabels: number[] = []
  firstHalfChecked:boolean=true
  secondHalfChecked:boolean=true

  toggledYears:YearValue[]=[]




  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild('infoContainer') infoContainer?: ElementRef

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) {
    Chart.register(...registerables);
  }

  ngOnInit() {

    this.shuffleArray(this.colors)
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


  @HostListener('window:resize')
  onResize() {
    if (this.tableHeight !== this.infoContainer?.nativeElement.offsetHeight) {
      this.tableHeight = this.infoContainer?.nativeElement.offsetHeight;
    }
    this.chart?.update();
  }

  showCheckbox(year: number): boolean {
    return this.min?.year === year || this.max?.year === year || this.past?.year === year;
  }


  isChecked(year: number): boolean {
    return (
      (this.min?.year === year && this.min.display) ||
      (this.max?.year === year && this.max.display) ||
      (this.current?.year === year && this.current.display) ||
      (this.selected?.some(item => item.year === year && item.display)) ||
      (this.selected?.some(item => item.year === year && item.display)) ||
      (this.past?.year === year && this.past.display)
    );
  }








  isToggledChecked(item:YearValue){
    return !this.toggledYears.includes(item)
  }



  isYearsChecked(years:YearValue[]):boolean{
    return years.some(item=>this.isChecked(item.year))

  }

  isYearMatched(year:number): boolean {
    return (
      this.min?.year === year ||
      this.max?.year === year ||
      this.current?.year === year ||
      this.past?.year === year
    );
  }

  isYearNotMatched(year:number): boolean {
    return (
      this.min?.year !== year &&
      this.max?.year !== year &&
      this.current?.year !== year &&
      this.past?.year !== year
    );
  }

  splitYears(years:any) {
    if (years.length > 20) {
      this.firstHalf = years.slice(0, 20);
      this.secondHalf = years.slice(20);
    } else {
      this.firstHalf = years;
    }
  }

  yearSelect(year: number | undefined) {
    // if year is undefined or year is already selected and changed visibility
    if (!year || this.changeVisibility(year.toString())) return;

    if (this.reservoirId) {
      this.api.getSelectedYearValues(this.reservoirId,year).subscribe({
        next: (response: ComplexValueResponse) => {
          const selectedYearByMonth = this.calculateMonthlyValues(response)
          const selectedYear = {
            year: this.getResponseYear(response),
            value: this.calculateMonthlySum(response)
          }
          if (this.colorsCounter > this.colors.length - 1) this.colorsCounter = 0
          const colors = this.colors[this.colorsCounter++]
          this._incomeChart.push({
            id: year.toString(),
            data: {
              data: selectedYearByMonth,
              label:
                `Данные за ${selectedYear.year}`,
              borderColor:
              colors.main,
              pointBackgroundColor:
              colors.sub,
              pointBorderColor:
              colors.main,
              pointHoverBackgroundColor:
              colors.sub,
              pointHoverBorderColor:
                '#fff',
            },
            valuesByMonth: selectedYearByMonth,
            year: selectedYear,
            color: colors.main,
            display: true
          })

          this.chart?.update()
        }
      })
    }
  }


  toggleYears(years: YearValue[]) {
    years.forEach(item => {
      if (this.isYearNotMatched(item.year)) {
        this.selected?.forEach(selectedItem => {
          if (selectedItem.year === item.year) {
            this.toggledYears=[...this.toggledYears,item]
            this.changeVisibility(selectedItem.id);
          }
        });
      } else {
        this.removeFromChart(item);
      }
    });
  }

  removeFromChart(item: YearValue) {
    if (this.past && item.year === this.past.year) {
      this.changeVisibility(this.past.id); // Call changeVisibility with the id of the item being removed
      this.past.display = false;
    } else if (this.max && item.year === this.max.year) {
      this.changeVisibility(this.max.id); // Call changeVisibility with the id of the item being removed
      this.max.display = false;
    } else if (this.min && item.year === this.min.year) {
      this.changeVisibility(this.min.id); // Call changeVisibility with the id of the item being removed
      this.min.display = false;
    } else if (this.current && item.year === this.current.year) {
      this.changeVisibility(this.current.id); // Call changeVisibility with the id of the item being removed
      this.current.display = false;
    }
  }


  changeVisibility(id: string) {
    let find = this._incomeChart.find(i => i.id == id);
    if (find) {
      find.display = !find.display
      return true
    }
    return false
  }

  changeCategory(category: string) {
    this.category = category
  }

  getColor(yearValue: YearValue) {
    if (this.selected) {
      return this.selected.find(i => i.year == yearValue.year)?.color
    }
    return
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
    this.getCurrentYear(reservoirId)
  }


  private getByYears(reservoirId: number) {
    this.subscribes.push(this.api.getByYearValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        this.startYear = new Date(response.data[0].date)
        this.endYear = new Date(response.data[response.data.length - 1].date)
        this.years = response.data.flatMap(item => {
          return {year: new Date(item.date).getFullYear(), value: this.calculateVolume(item)}
        })
        this.splitYears(this.years)
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
        this.getTenYearsAvg(reservoirId)
      }
    }))
  }

  private getAvg(reservoirId: number) {
    this.subscribes.push(this.api.getAvgValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        const avgByMonth = this.calculateMonthlyValues(response)
        const avgValue = this.calculateMonthlySum(response)
        this._incomeChart.push({
          id: 'avg',
          data: {
            data: avgByMonth,
            label: `Среднее за года (${this.startYear?.getFullYear()} - ${this.endYear?.getFullYear()})`,
            borderColor: 'rgba(37, 99, 235,0.4)',
            pointBackgroundColor: 'rgba(37, 99, 235,0.5)',
            pointBorderColor: 'rgba(37, 99, 235,0.4)',
            pointHoverBackgroundColor: 'rgba(37, 99, 235,0.2)',
            pointHoverBorderColor: '#fff',
          },
          valuesByMonth: avgByMonth,
          avgValue: avgValue,
          display: true
        })
        this.chart?.update()
      }
    }))
  }

  private getTenYearsAvg(reservoirId: number) {
    this.subscribes.push(this.api.getTenYearsAvgValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        const avgByMonth = this.calculateMonthlyValues(response)
        const avgValue = this.calculateMonthlySum(response)
        this._incomeChart.push({
          id: 'tenAvg',
          data: {
            data: avgByMonth,
            label: `Среднее за 10 лет`,
            borderColor: 'rgba(37, 99, 235,0.4)',
            pointBackgroundColor: 'rgba(37, 99, 235,0.5)',
            pointBorderColor: 'rgba(37, 99, 235,0.4)',
            pointHoverBackgroundColor: 'rgba(37, 99, 235,0.2)',
            pointHoverBorderColor: '#fff',
          },
          valuesByMonth: avgByMonth,
          avgValue: avgValue,
          display: true
        })
        this.chart?.update()
      }
    }))
  }

  private getMin(reservoirId: number) {
    this.subscribes.push(this.api.getMinValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        const minByMonth = this.calculateMonthlyValues(response)
        const minValue = {
          year: this.getResponseYear(response),
          value: this.calculateMonthlySum(response)
        }
        this._incomeChart.push({
          id: 'min',
          data: {
            data: minByMonth,
            label: `Минимум ${minValue.year}`,
            borderColor: 'rgba(225, 29, 72,0.4)',
            pointBackgroundColor: 'rgba(225, 29, 72,0.5)',
            pointBorderColor: 'rgba(225, 29, 72,0.4)',
            pointHoverBackgroundColor: 'rgba(225, 29, 72,0.8)',
            pointHoverBorderColor: '#fff',
          },
          valuesByMonth: minByMonth,
          year: minValue,
          display: true
        })
        this.chart?.update()
      }
    }))
  }

  private getMax(reservoirId: number) {
    this.subscribes.push(this.api.getMaxValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        const maxByMonth = this.calculateMonthlyValues(response)
        const maxValue = {
          year: this.getResponseYear(response),
          value: this.calculateMonthlySum(response)
        }
        this._incomeChart.push({
          id: 'max',
          data: {
            data: maxByMonth,
            label: `Максимум ${maxValue.year}`,
            borderColor: 'rgba(22, 163, 74,0.4)',
            pointBackgroundColor: 'rgba(22, 163, 74,0.5)',
            pointBorderColor: 'rgba(22, 163, 74,0.4)',
            pointHoverBackgroundColor: 'rgba(22, 163, 74,0.8)',
            pointHoverBorderColor: '#fff',
          },
          valuesByMonth: maxByMonth,
          year: maxValue,
          display: true
        })
        this.chart?.update()
      }
    }))
  }


  private getPastYear(reservoirId: number) {
    this.subscribes.push(this.api.getSelectedYearValues(reservoirId, new Date().getFullYear() - 1).subscribe({
      next: (response: ComplexValueResponse) => {
        const pastYearByMonth = this.calculateMonthlyValues(response)
        const pastYear = {
          year: this.getResponseYear(response),
          value: this.calculateMonthlySum(response)
        }
        this._incomeChart.push({
          id: 'past',
          data: {
            data: pastYearByMonth,
            label: `Данные за прошлый ${pastYear.year}`,
            borderColor: 'rgba(217, 119, 6,0.4)',
            pointBackgroundColor: 'rgba(217, 119, 6,0.5)',
            pointBorderColor: 'rgba(217, 119, 6,0.4)',
            pointHoverBackgroundColor: 'rgba(217, 119, 6,0.2)',
            pointHoverBorderColor: '#fff',
          },
          valuesByMonth: pastYearByMonth,
          year: pastYear,
          display: true
        })
        this.chart?.update()
      }
    }))
  }

  private getCurrentYear(reservoirId: number) {
    this.subscribes.push(this.api.getSelectedYearValues(reservoirId, new Date().getFullYear()).subscribe({
      next: (response: ComplexValueResponse) => {
        const currentYearByMonth = this.calculateMonthlyValues(response)
        const currentYear = {
          year: this.getResponseYear(response),
          value: this.calculateMonthlySum(response)
        }
        this._incomeChart.push({
          id: 'current',
          data: {
            data: currentYearByMonth,
            label: `Данные за прошлый ${currentYear.year}`,
            borderColor: 'rgba(147, 51, 234,0.4)',
            pointBackgroundColor: 'rgba(147, 51, 234,0.5)',
            pointBorderColor: 'rgba(147, 51, 234,0.4)',
            pointHoverBackgroundColor: 'rgba(147, 51, 234,0.2)',
            pointHoverBorderColor: '#fff',
          },
          valuesByMonth: currentYearByMonth,
          year: currentYear,
          display: true
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

  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

}

interface YearValue {
  year: number
  value: number,
}

interface Values {
  id: string
  value: number
  byMonth: number[]
  year?: number
  color?: string
  display: boolean,

}





