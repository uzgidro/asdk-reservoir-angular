import {AfterViewInit, Component, Inject, NgZone, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {ComplexValueResponse, ValueResponse} from "../../shared/response/values-response";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {Subscription} from "rxjs";
import {DecimalPipe, NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {Chart} from "../../shared/component/chart";
import {DateChart} from "../../shared/struct/chart";
import {CardWrapperComponent} from "../../shared/component/card-wrapper/card-wrapper.component";

@Component({
    selector: 'app-reservoir-analytics',
    templateUrl: './reservoir-analytics.component.html',
    styleUrl: './reservoir-analytics.component.css',
    imports: [
        NgClass,
        NgStyle,
        NgForOf,
        NgIf,
        DecimalPipe,
        CardWrapperComponent
    ]
})
export class ReservoirAnalyticsComponent
  extends Chart
  implements AfterViewInit {

  protected mSecondsInDay = 0.0864
  protected years: YearValue[] = []
  private colors: { main: string, sub: string }[] = [
    {main: 'rgba(220, 38, 38,1)', sub: 'rgba(220, 38, 38,0.8)'},
    {main: 'rgba(234, 88, 12,1)', sub: 'rgba(234, 88, 12,0.8)'},
    {main: 'rgba(202, 138, 4,1)', sub: 'rgba(202, 138, 4,0.8)'},
    {main: 'rgba(101, 163, 13,1)', sub: 'rgba(101, 163, 13,0.8)'},
    {main: 'rgba(5, 150, 105,1)', sub: 'rgba(5, 150, 105,0.8)'},
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
    avgValue: number
    year?: YearValue
    display: boolean
  }[] = []

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

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    zone: NgZone,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService) {
    super(platformId, zone)
  }

  override ngOnInit() {
    super.ngOnInit()
    this.shuffleArray(this.colors)
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        if (value['reservoir'] == undefined) {
          this.zone.run(async () => {
            await this.router.navigate([], {
              relativeTo: this.activatedRoute,
              queryParams: {reservoir: 1},
              queryParamsHandling: 'merge', // Сохраняем существующие queryParams
            })
          })
        }

        this.api.getReservoirById(value['reservoir']).subscribe({
          next: (response: ReservoirResponse) => {
            this.reservoirId = response.id
            this.reservoirName = response.name
          }
        })
        this.clearSeries()
        this.configureData(value['reservoir'])
      }
    })
  }

  ngAfterViewInit() {
    this.renderDateChart()
  }

  get incomeChartMap() {
    return new Map(this._incomeChart.map(item => [item.id, item]))
  }

  get avg() {
    return this.getItem('avg', 'avgValue');
  }

  get tenAvg() {
    return this.getItem('tenAvg', 'avgValue');
  }

  get min() {
    return this.getItem('min', 'year');
  }

  get max() {
    return this.getItem('max', 'year');
  }

  get past() {
    return this.getItem('past', 'year');
  }

  get current() {
    return this.getItem('current', 'year');
  }

  get selected() {
    const exists = this._incomeChart.filter(
      item =>
        !item.id.includes('tenAvg') &&
        !item.id.includes('past') &&
        !item.id.includes('min') &&
        !item.id.includes('max') &&
        !item.id.includes('current') &&
        !item.id.includes('avg') &&
        item.display)
    if (exists.length > 0) {
      let map: Values[] = exists.map(item => ({
        id: item.id,
        value: item.year?.value ?? 0,
        byMonth: item.valuesByMonth,
        year: item.year?.year,
        color: item.chart.color ? item.chart.color : '',
        display: item.display
      }));
      return map
    }
    return
  }

  private get yearMappings() {
    return [this.min, this.max, this.current, this.past]
  }

  isYearsChecked(years: { year: number }[]): boolean {
    return years.some(yearItem => {
      return this.yearMappings.some(
        item => item?.year === yearItem.year && item.display
      )
    });
  }

  isYearMatched(year: number): boolean {
    return this.yearMappings.some(item => item?.year === year);
  }

  yearSelect(year: number) {
    let existChart = this._incomeChart.find(item => item.year ? item.year.year === year : false);

    if (!existChart) {
      this.api.getSelectedYearValues(this.reservoirId, year).subscribe({
        next: (response: ComplexValueResponse) => {
          if (this.colorsCounter > this.colors.length - 1) this.colorsCounter = 0
          const colors = this.colors[this.colorsCounter++]
          this.collectData({
            id: year.toString(),
            seriesName: this.getResponseYear(response).toString(),
            seriesColor: colors.sub,
            response: response
          })
        }
      })
    } else {
      this.changeVisibility(existChart.id)
    }
  }


  toggleYears(years: YearValue[]) {
    const selectedMap = new Map(this.selected?.map(item => [item.year, item]));

    years.forEach(item => {
      if (!this.isYearMatched(item.year)) {
        const selectedItem = selectedMap.get(item.year);
        if (selectedItem) {
          this.changeVisibility(selectedItem.id);
        }
      } else {
        this.removeFromChart(item);
      }
    });
  }

  removeFromChart(item: YearValue) {
    this.yearMappings.forEach(mapping => {
      if (mapping && item.year === mapping.year) {
        this.changeVisibility(mapping.id); // Call changeVisibility with the id of the item being removed
        mapping.display = false;
      }
    });
  }


  changeVisibility(id: string) {
    const existsChart = this.incomeChartMap.get(id);
    if (existsChart) {
      existsChart.display = !existsChart.display;
      if (existsChart.display) {
        this.addDateSeries([existsChart.chart], {hideBullets: true});
      } else {
        this.removeSeries(existsChart.chart.seriesName);
      }
    }
  }

  changeCategory(category: 'income' | 'volume') {
    this.category = category
  }

  getColor(yearValue: YearValue) {
    return this._incomeChart.find(i => i.year?.year == yearValue.year && i.display)?.chart.color
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
        // TODO(): Volume chart
        // this.volumeChartLabels = response.data.map(item => new Date(item.date).getFullYear())
        // this.volumeChartDataset[0] = {
        //   data: this.calculateMonthlyValues(response),
        //   label: `Suv kelishi, mln.m³`,
        //   borderColor: 'rgba(37, 99, 235,0.4)',
        //   pointBackgroundColor: 'rgba(37, 99, 235,0.5)',
        //   pointBorderColor: 'rgba(37, 99, 235,0.4)',
        //   pointHoverBackgroundColor: 'rgba(37, 99, 235,0.2)',
        //   pointHoverBorderColor: '#fff',
        // }
        this.getAvg(reservoirId)
        this.getTenYearsAvg(reservoirId)
      }
    }))
  }

  private getAvg(reservoirId: number) {
    this.subscribes.push(this.api.getAvgValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        this.collectData({
          id: 'avg',
          seriesName: `(${this.startYear?.getFullYear()} - ${this.endYear?.getFullYear()}) o'rtacha`,
          seriesColor: 'rgb(37, 99, 235)',
          response: response
        })
      }
    }))
  }

  private getTenYearsAvg(reservoirId: number) {
    this.subscribes.push(this.api.getTenYearsAvgValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        this.collectData({
          id: 'tenAvg',
          seriesName: `O'rtacha 10 yil`,
          seriesColor: 'rgb(13, 148, 136)',
          response: response
        })
      }
    }))
  }

  private getMin(reservoirId: number) {
    this.subscribes.push(this.api.getMinValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        this.collectData({
          id: 'min',
          seriesName: `${this.getResponseYear(response)} minimal`,
          seriesColor: 'rgb(225, 29, 72)',
          response: response
        })
      }
    }))
  }

  private getMax(reservoirId: number) {
    this.subscribes.push(this.api.getMaxValues(reservoirId).subscribe({
      next: (response: ComplexValueResponse) => {
        this.collectData({
          id: 'max',
          seriesName: `${this.getResponseYear(response)} maksimal`,
          seriesColor: 'rgb(22, 163, 74)',
          response: response
        })
      }
    }))
  }

  private getPastYear(reservoirId: number) {
    this.subscribes.push(this.api.getSelectedYearValues(reservoirId, new Date().getFullYear() - 1).subscribe({
      next: (response: ComplexValueResponse) => {
        this.collectData({
          id: 'past',
          seriesName: this.getResponseYear(response).toString(),
          seriesColor: 'rgb(217, 119, 6)',
          response: response
        })
      }
    }))
  }

  private getCurrentYear(reservoirId: number) {
    this.subscribes.push(this.api.getSelectedYearValues(reservoirId, new Date().getFullYear()).subscribe({
      next: (response: ComplexValueResponse) => {
        this.collectData({
          id: 'current',
          seriesName: this.getResponseYear(response).toString(),
          seriesColor: 'rgb(147, 51, 234)',
          response: response,
        })
      }
    }))
  }

  private collectData(data: {
    id: string,
    seriesName: string,
    seriesColor: string,
    response: ComplexValueResponse
  }) {
    const chart: DateChart = {
      seriesName: data.seriesName,
      color: data.seriesColor,
      data: this.calculateMonthlyValues(data.response)
    }
    this.addDateSeries([chart], {hideBullets: true})
    const year = data.id.includes('vg') ? undefined : {
      year: this.getResponseYear(data.response),
      value: this.calculateMonthlySum(data.response)
    }
    this._incomeChart.push({
      id: data.id,
      chart: chart,
      valuesByMonth: this.calculateMonthlyValues(data.response).map(value => value.value),
      year: year,
      avgValue: this.calculateMonthlySum(data.response),
      display: true
    })
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
      timestamp: new Date(value.date).setFullYear(2020)
    }))
  }

  private getItem(idPart: string, valueField: 'avgValue' | 'year'): Values | undefined {
    const exists = this._incomeChart.find(item => item.id.includes(idPart));

    if (exists) {
      const value = valueField === 'avgValue' ? exists.avgValue : exists.year?.value;
      const year = exists.year?.year;

      if (value !== undefined) {
        return {
          id: exists.id,
          value,
          byMonth: exists.valuesByMonth,
          year,
          display: exists.display,
        };
      }
    }
    return undefined;
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
