import {AfterViewInit, Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {NgChartsModule} from "ng2-charts";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {ComplexValueResponse, ValueResponse} from "../../shared/response/values-response";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {Subscription} from "rxjs";
import {DecimalPipe, NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {Chart} from "../../shared/component/chart";
import {DateChart} from "../../shared/struct/chart";

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
export class ReservoirAnalyticsComponent
  extends Chart
  implements OnInit, AfterViewInit, OnDestroy {

  id!: string;

  protected mSecondsInDay = 0.0864
  protected years: YearValue[] = []
  private colors: { main: string, sub: string }[] = [
    {main: 'rgba(220, 38, 38,1)', sub: 'rgba(220, 38, 38,0.8)'},
    {main: 'rgba(234, 88, 12,1)', sub: 'rgba(234, 88, 12,0.8)'},
    {main: 'rgba(202, 138, 4,1)', sub: 'rgba(202, 138, 4,0.8)'},
    {main: 'rgba(101, 163, 13,1)', sub: 'rgba(101, 163, 13,0.8)'},
    {main: 'rgba(5, 150, 105,1)', sub: 'rgba(5, 150, 105,0.8)'},
    // {main: 'rgba(13, 148, 136,1)', sub: 'rgba(13, 148, 136,0.8)'},
    {main: 'rgba(8, 145, 178,1)', sub: 'rgba(8, 145, 178,0.8)'},
    {main: 'rgba(2, 132, 199,1)', sub: 'rgba(2, 132, 199,0.8)'},
    {main: 'rgba(79, 70, 229,1)', sub: 'rgba(79, 70, 229,0.8)'},
    {main: 'rgba(124, 58, 237,1)', sub: 'rgba(124, 58, 237,0.8)'},
    {main: 'rgba(192, 38, 211,1)', sub: 'rgba(192, 38, 211,0.8)'},
    {main: 'rgba(219, 39, 119,1)', sub: 'rgba(219, 39, 119,0.8)'}
  ];
  private colorsCounter = 0;

  private _incomeChart: {
    id: string
    chart: DateChart
    valuesByMonth: number[]
    avgValue?: number
    year?: YearValue
    display: boolean
  }[] = []

  get displayedReservoirsCount(): number {
    return this._incomeChart.filter(m => m.display).length;
  }

  reservoirId!: number;
  reservoirName!: string;
  category: 'income' | 'volume' = 'income';

  startYear!: Date;
  endYear!: Date;
  subscribes: Subscription[] = [];
  incomeChartLabels = [
    'Yanv.', 'Fev.', 'Mart', 'Apr.', 'May', 'Iyun',
    'Iyul', 'Avg.', 'Sen.', 'Okt.', 'Noy.', 'Dek.'
  ];
  volumeChartDataset: any[] = [];
  volumeChartLabels: number[] = [];
  reservoir = 'reservoir';

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    zone: NgZone,
    private activatedRoute: ActivatedRoute,
    private api: ApiService) {
    super(platformId, zone)
  }

  ngOnInit() {
    this.id = this.generateId()
    this.shuffleArray(this.colors)
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.api.getReservoirById(value[this.reservoir]).subscribe({
          next: (response: ReservoirResponse) => {
            this.reservoirId = response.id
            this.reservoirName = response.name
          }
        })
        this.configureData(value[this.reservoir])
      }
    })
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.chartDispose()
  }

  get displayCharts() {
    return this._incomeChart.filter(i => i.display)
  }

  // get incomeChart() {
  //   return this.displayCharts.map(item => item.data);
  // }

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
        color: item.chart.color ? item.chart.color : '',
        display: item.display
      }));
      return map
    }
    return
  }

  isChecked(year: number): boolean {
    return (
      [this.min, this.max, this.current, this.past].some(item => item?.year === year && item.display) ||
      (this.selected?.some(item => item.year === year && item.display) ?? false)
    );
  }

  isYearsChecked(years: YearValue[]): boolean {
    return years.some(item => this.isChecked(item.year))
  }

  isYearMatched(year: number): boolean {
    return [this.min, this.max, this.current, this.past].some(item => item?.year === year);
  }

  isYearNotMatched(year: number): boolean {
    return !this.isYearMatched(year);
  }

  yearSelect(year: number | undefined) {
    // if year is undefined or year is already selected and changed visibility
    // if (!year || this.changeVisibility(year.toString())) return;
    // if (this.reservoirId) {
    //   this.api.getSelectedYearValues(this.reservoirId, year).subscribe({
    //     next: (response: ComplexValueResponse) => {
    //       const selectedYearByMonth = this.calculateMonthlyValues(response)
    //       const selectedYear = {
    //         year: this.getResponseYear(response),
    //         value: this.calculateMonthlySum(response)
    //       }
    //       if (this.colorsCounter > this.colors.length - 1) this.colorsCounter = 0
    //       const colors = this.colors[this.colorsCounter++]
    //       this._incomeChart.push({
    //         id: year.toString(),
    //         data: {
    //           data: selectedYearByMonth,
    //           label:
    //             `${selectedYear.year}`,
    //           borderColor:
    //           colors.main,
    //           pointBackgroundColor:
    //           colors.sub,
    //           pointBorderColor:
    //           colors.main,
    //           pointHoverBackgroundColor:
    //           colors.sub,
    //           pointHoverBorderColor:
    //             '#fff',
    //         },
    //         valuesByMonth: selectedYearByMonth,
    //         year: selectedYear,
    //         color: colors.main,
    //         display: true
    //       })
    //
    //       this.chart?.update()
    //     }
    //   })
    // }
  }


  toggleYears(years: YearValue[]) {
    years.forEach(item => {
      if (this.isYearNotMatched(item.year)) {
        this.selected?.forEach(selectedItem => {
          if (selectedItem.year === item.year) {
            this.changeVisibility(selectedItem.id);
          }
        });
      } else {
        this.removeFromChart(item);
      }
    });
  }

  removeFromChart(item: YearValue) {
    const yearMappings = [this.past, this.max, this.min, this.current];
    yearMappings.forEach(mapping => {
      if (mapping && item.year === mapping.year) {
        this.changeVisibility(mapping.id); // Call changeVisibility with the id of the item being removed
        mapping.display = false;
      }
    });
  }


  changeVisibility(id: string) {
    let find = this._incomeChart.find(i => i.id == id);
    if (find) {
      find.display = !find.display
      return true
    }
    return false
  }

  changeCategory(category: 'income' | 'volume') {
    this.category = category
  }

  getColor(yearValue: YearValue) {
    if (this.selected) {
      return this.selected.find(i => i.year == yearValue.year)?.color
    }
    return
  }

  private configureData(reservoirId: number) {
    if (this._incomeChart.length > 0) {
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
        this.volumeChartLabels = response.data.map(item => new Date(item.date).getFullYear())
        // TODO(): Volume chart
        this.volumeChartDataset[0] = {
          data: this.calculateMonthlyValues(response),
          label: `Suv kelishi, mln.m³`,
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
        console.log(avgByMonth)
        const avgValue = this.calculateMonthlySum(response)
        const chart: DateChart = {
          seriesName: `(${this.startYear?.getFullYear()} - ${this.endYear?.getFullYear()}) o'rtacha`,
          color: 'rgb(37, 99, 235)',
          data: avgByMonth
        }
        this.renderHourChart(this.id, [chart])
        this._incomeChart.push({
          id: 'avg',
          chart: chart,
          valuesByMonth: avgByMonth.map(value => value.value),
          avgValue: avgValue,
          display: true
        })
        // this.chart?.update()
      }
    }))
  }

  private getTenYearsAvg(reservoirId: number) {
    this.subscribes.push(this.api.getTenYearsAvgValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        const avgByMonth = this.calculateMonthlyValues(response)
        const avgValue = this.calculateMonthlySum(response)
        const chart: DateChart = {
          seriesName: `O'rtacha 10 yil`,
          color: 'rgb(13, 148, 136)',
          data: avgByMonth
        }
        this._incomeChart.push({
          id: 'tenAvg',
          chart: chart,
          valuesByMonth: avgByMonth.map(value => value.value),
          avgValue: avgValue,
          display: true
        })
        // this.chart?.update()
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
        const chart: DateChart = {
          seriesName: `${minValue.year} minimal`,
          color: 'rgb(225, 29, 72)',
          data: minByMonth
        }
        this._incomeChart.push({
          id: 'min',
          chart: chart,
          valuesByMonth: minByMonth.map(value => value.value),
          year: minValue,
          display: true
        })
        // this.chart?.update()
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
        const chart: DateChart = {
          seriesName: `${maxValue.year} maksimal`,
          color: 'rgb(22, 163, 74)',
          data: maxByMonth
        }
        this._incomeChart.push({
          id: 'max',
          chart: chart,
          valuesByMonth: maxByMonth.map(value => value.value),
          year: maxValue,
          display: true
        })
        // this.chart?.update()
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
        const chart: DateChart = {
          seriesName: `${pastYear.year}`,
          color: 'rgb(217, 119, 6)',
          data: pastYearByMonth
        }
        this._incomeChart.push({
          id: 'past',
          chart: chart,
          valuesByMonth: pastYearByMonth.map(value => value.value),
          year: pastYear,
          display: true
        })
        // this.chart?.update()
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
        const chart: DateChart = {
          seriesName: `${currentYear.year}`,
          color: 'rgb(147, 51, 234)',
          data: currentYearByMonth
        }
        this._incomeChart.push({
          id: 'current',
          chart: chart,
          valuesByMonth: currentYearByMonth.map(value => value.value),
          year: currentYear,
          display: true
        })
        // this.chart?.update()
      }
    }))
  }

  private getResponseYear(response: ComplexValueResponse) {
    return new Date(response.data[0].date).getFullYear()
  }

  private calculateMonthlySum(response: ComplexValueResponse) {
    return this.calculateMonthlyValues(response)
      .reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
  }

  private calculateMonthlyValues(response: ComplexValueResponse) {
    return response.data.map(value => ({
      value: this.calculateVolume(value),
      timestamp: new Date(value.date).getTime()
    }))
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
