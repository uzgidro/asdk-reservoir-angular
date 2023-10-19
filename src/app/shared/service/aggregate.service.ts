import {Injectable} from "@angular/core";
import {Aggregate} from "../interfaces";

@Injectable({providedIn: 'root'})
export class AggregateService {
  aggregateList: Aggregate[] = [
    {
      name: 'Ag1',
      installedPower: 100,
      valveOpenness: 60,
      pressure: 1.5,
      waterRelease: 130,
      efficiency:0.8,
      actualEfficiency: 0.6,
      activePower: 200,
      difference: 10,
      reactivePower: 100,
      status: true
    },
    {
      name: 'Ag2',
      installedPower: 300,
      valveOpenness: 90,
      pressure: 4,
      waterRelease: 200,
      efficiency:0.8,
      actualEfficiency: 0.8,
      activePower: 200,
      difference: 10,
      reactivePower: 100,
      status: false
    },
    {
      name: 'Ag3',
      installedPower: 100,
      valveOpenness: 60,
      pressure: 3,
      waterRelease: 130,
      efficiency:0.8,
      actualEfficiency: 0.6,
      activePower: 200,
      difference: 10,
      reactivePower: 100,
      status: true
    },
    {
      name: 'Ag4',
      installedPower: 100,
      valveOpenness: 60,
      pressure: 2,
      waterRelease: 130,
      efficiency:0.7,
      actualEfficiency: 0.5,
      activePower: 200,
      difference: 10,
      reactivePower: 100,
      status: false
    },
    {
      name: 'Ag5',
      installedPower: 100,
      valveOpenness: 60,
      pressure: 2,
      waterRelease: 130,
      efficiency:0.6,
      actualEfficiency: 0.6,
      activePower: 200,
      difference: 10,
      reactivePower: 100,
      status: true
    }
  ]
}
