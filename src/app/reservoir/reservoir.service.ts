import {Injectable} from '@angular/core';
import {Params} from "@angular/router";
import {RegionInfo} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ReservoirService {

  constructor() {
  }

  setReservoir(params: Params, regions: RegionInfo[]) {
    const resId = params['reservoir']
    const res = regions.find(value1 => resId === value1.id)
    if (res) {
      return res
    }
    return undefined
  }
}
