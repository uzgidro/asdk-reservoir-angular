import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservoirService {

  constructor() {
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
