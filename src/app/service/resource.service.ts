import { Injectable } from '@angular/core';
import {ComplexValueResponse, ReservoiredArrayResponse} from "../shared/response/values-response";
import {ReservoirData} from "../shared/interface/reservoir-data";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor() { }

  parseResponse(response: ReservoiredArrayResponse): ReservoirData {
    return {
      reservoirId: response.reservoir.id,
      reservoir: response.reservoir.name,
      income: response.income.data[0].value,
      incomeDifference: this.getDifference(response.income),
      incomeChart: [{
        data: response.income.data.map(value => value.value).reverse(),
        label: 'Kelish',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      }],
      release: response.release.data[0].value,
      releaseDifference: this.getDifference(response.release),
      releaseChart: [{
        data: response.release.data.map(value => value.value).reverse(),
        label: 'Chiqish',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      }],
      volume: response.volume.data[0].value,
      volumeDifference: this.getDifference(response.volume),
      volumeChart: [{
        data: response.volume.data.map(value => value.value).reverse(),
        label: 'Hajm',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      }],
      level: response.level.data[0].value,
      levelDifference: this.getDifference(response.level),
      levelChart: [{
        data: response.level.data.map(value => value.value).reverse(),
        label: 'Sath',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      }],
      incomeLabels: response.income.data.map(value => value.date.split(' ')[1].substring(0, 5)).reverse(),
      releaseLabels: response.release.data.map(value => value.date.split(' ')[1].substring(0, 5)).reverse(),
      levelLabels: response.level.data.map(value => value.date.split(' ')[1].substring(0, 5)).reverse(),
      volumeLabels: response.volume.data.map(value => value.date.split(' ')[1].substring(0, 5)).reverse(),
    }
  }

  private getDifference(data: ComplexValueResponse) {
    const diff = data.data[0].value - data.data[1].value;
    return (diff > 0 ? '+' : '') + (diff % 1 === 0 ? diff.toString() : diff.toFixed(2))
  }
}
