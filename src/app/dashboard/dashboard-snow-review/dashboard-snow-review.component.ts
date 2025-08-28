import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Chart} from "../../shared/component/chart";
import {data} from "autoprefixer";

@Component({
    selector: 'app-dashboard-snow-review',
    imports: [],
    templateUrl: './dashboard-snow-review.component.html',
    styleUrl: './dashboard-snow-review.component.css'
})
export class DashboardSnowReviewComponent
  extends Chart
  implements AfterViewInit, OnChanges {
  @Input() reservoirId?: number

  private snowData = [
    {
      id: 1,
      seriesName: 'Andijon',
      data: this.setChartData([78, 80, 96, 96, 95, 94, 94, 94, 99, 95, 88, 84, 81, 85, 80, 80, 80, 80, 80, 79, 76, 78, 78, 91, 91, 88, 85, 86, 86, 92, 93]),
    },
    {
      id: 2,
      seriesName: 'Ohangaron',
      data: this.setChartData([85, 95, 97, 96, 96, 96, 98, 98, 99, 98, 92, 94, 89, 85, 85, 86, 86, 90, 90, 90, 88, 89, 89, 98, 99, 96, 97, 97, 97, 98, 98]),
    },
    {
      id: 6,
      seriesName: 'Chorvoq',
      data: this.setChartData([90,	96,	95,	95,	95,	95,	97,	97,	98,	96,	93,	96,	92,	92,	93,	93,	93,	94,	95,	95,	95,	96,	96,	97,	98,	98,	97,	98,	98,	97,	98]),
    },
    {
      id: 3,
      seriesName: 'Pskom',
      data: this.setChartData([95,	96,	98,	99,	98,	99,	99,	98,	99,	98,	98,	99,	97,	97,	97,	97,	97,	98,	98,	99,	99,	98,	98,	98,	99,	99,	99,	99,	99,	99,	99]),
    },
    {
      id: 4,
      seriesName: 'Hisorak',
      data: this.setChartData([70,	71,	88,	92,	94,	95,	95,	86,	81,	76,	76,	77,	74,	70,	69,	69,	69,	70,	92,	92,	85,	90,	88,	89,	87,	82,	81,	85,	84,	92,	89]),
    },
    {
      id: 5,
      seriesName: 'To\'palang',
      data: this.setChartData([60,	63,	68,	68,	70,	72,	75,	80,	77,	72,	69,	72,	69,	64,	66,	66,	68,	68,	71,	72,	72,	73,	74,	81,	81,	79,	76,	78,	78,	77,	77]),
    }
  ]

  get data() {
    if (this.reservoirId)
      {
        let find = this.snowData.find(it => it.id == this.reservoirId);
        return [{seriesName: find!.seriesName, data: find!.data}];
      }
    else return this.snowData
  }

  ngAfterViewInit() {
    this.renderDateChart(this.data.map(it => ({
      seriesName: it.seriesName,
      data: it.data
    })), {hideBullets: true})
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reservoirId'] && !changes['reservoirId'].firstChange) {
      this.updateDateChart(this.data.map(it => ({
        seriesName: it.seriesName,
        data: it.data
      })))
    }
  }

  private setChartData(data: number[]) {
    return data.map((item, index) => {
      return {
        value: item,
        timestamp: new Date().setDate(new Date().getDate() - data.length + index),
      }
    })
  }

}
