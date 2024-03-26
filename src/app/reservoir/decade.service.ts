import {Injectable} from '@angular/core';
import {ValueResponse} from "../shared/response/values-response";
import {Decade} from "../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class DecadeService {

  months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]
  decade: string[] = [
    "I", "II", "III",
    "I", "II", "III",
    "I", "II", "III",
    "I", "II", "III",
    "I", "II", "III",
    "I", "II", "III",
    "I", "II", "III",
    "I", "II", "III",
    "I", "II", "III",
    "I", "II", "III",
    "I", "II", "III",
    "I", "II", "III",
  ]

  constructor() {
  }

  setDecade(category: string, values: ValueResponse[], isNormal: boolean = true): Decade {
    const chunked = this.chunkArray(values, isNormal)
    console.log(chunked)
    const stat = this.getStatistics(chunked)

    return {
      category: category,
      data: chunked,
      statStart: stat.start,
      statEnd: stat.end,
      stat5: stat.stat5,
      stat10: stat.stat10,
      stat30: stat.stat30,
      statTotal: stat.statTotal,
      statLastYear: stat.statLastYear
    }
  }

  private chunkArray(array: ValueResponse[], isNormal: boolean) {
    // remove 1st element if it's not january
    if (isNormal)
      while (new Date(array[0].date).getMonth() !== 0) {
        array = array.slice(1)
      }
    // remove 1st element if it's not april on vegetative table
    else
      while (new Date(array[0].date).getMonth() !== 3) {
        array = array.slice(1)
      }
    // 12 months with 3 decades = 36
    const size = this.decade.length
    return Array.from(
      {length: Math.ceil(array.length / size)},
      (_, index) =>
        array.slice(index * size, index * size + size)
    );
  }

  private getStatistics(chunked: ValueResponse[][]) {
    let start
    let end
    let stat5: number[] = []
    let stat10: number[] = []
    let stat30: number[] = []
    let statTotal: number[] = []
    let statLastYear: number[] = chunked[chunked.length - 1].map(item => item.value)
    for (let i = 0; i < this.decade.length; i++) {
      // get all data by this decade
      const dateData = chunked
        .map(sub => sub[i])
        .sort(
          (a, b) => {
            if (new Date(a.date) > new Date(b.date))
              return 1
            else if (new Date(a.date) < new Date(b.date))
              return -1
            else
              return 0
          })
      if (i == 0) {
        start = new Date(dateData[0].date)
        end = new Date(dateData[dateData.length - 1].date)
      }
      if (dateData.length >= 5) {
        const slicedArray = dateData.slice(-5)
        const data = slicedArray.reduce((acc, currentValue) => acc + currentValue.value, 0)
        stat5.push(Math.round(data / slicedArray.length))
      }
      if (dateData.length >= 10) {
        const slicedArray = dateData.slice(-10)
        const data = slicedArray.reduce((acc, currentValue) => acc + currentValue.value, 0)
        stat10.push(Math.round(data / slicedArray.length))
      }
      if (dateData.length >= 30) {
        const slicedArray = dateData.slice(-30)
        const data = slicedArray.reduce((acc, currentValue) => acc + currentValue.value, 0)
        stat30.push(Math.round(data / slicedArray.length))
      }
      const data = dateData.reduce((acc, currentValue) => acc + currentValue.value, 0)
      statTotal.push(Math.round(data / dateData.length))
    }
    return {
      start: start,
      end: end,
      stat5: stat5,
      stat10: stat10,
      stat30: stat30,
      statTotal: statTotal,
      statLastYear: statLastYear,
    }
  }
}
