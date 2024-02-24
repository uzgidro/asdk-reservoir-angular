import {Injectable} from '@angular/core';
import {MetricCategory} from "../shared/enum/metric-category";
import {ValueResponse} from "../shared/response/values-response";

@Injectable({
  providedIn: 'root'
})
export class ReservoirService {

  constructor() {
  }

  convertMetrics(array: any[], category: MetricCategory, type: 'day'|'decade' = 'day') {
    const coefficient = type  === 'day' ? 0.0864 : 0.864
    const multiply = category === MetricCategory.VOLUME ? coefficient : 1/coefficient
    array.forEach((element, index, array) => {
      if (typeof array[index] === 'number')
      array[index] *= multiply
    })
  }

  convertMetricsValueResponse(array: ValueResponse[], category: MetricCategory, type: 'day'|'decade' = 'day') {
    const coefficient = type  === 'day' ? 0.0864 : 0.864
    const multiply = category === MetricCategory.VOLUME ? coefficient : 1/coefficient
    array.forEach(item => item.value *= multiply)
  }

  setupChartTimeline() {
    let chartTimeline: string[] = []
    let now: number
    if (new Date().getHours() % 2 === 0) {
      now = new Date().getHours()
    } else {
      now = new Date().getHours() - 1
    }
    let start = 0
    let counter = 2
    while (true) {

      chartTimeline.push((now + counter) < 10 ? '0' + (now + counter) + ':00' : (now + counter) + ':00')
      if (now + counter == 22)
        break
      counter += 2
    }
    while (start <= now) {
      chartTimeline.push(start < 10 ? '0' + start + ':00' : start + ':00')
      start += 2
    }
    return chartTimeline
  }
}
