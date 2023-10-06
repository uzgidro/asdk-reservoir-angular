import {Injectable} from "@angular/core";
import {Region} from "../interfaces";

@Injectable({providedIn: 'root'})
export class RegionService {

  tashkent: Region = {
    label: 'Ташкент',
    reservoirCount: 2,
    gesCount: 23,
    aggregateCount: 53,
    activePower: 1310,
    activePowerAtMoment: 1000,
    frequency: 50
  }

  sirdarya: Region = {
    label: 'Сырдарья',
    reservoirCount: 1,
    gesCount: 1,
    aggregateCount: 4,
    activePower: 126,
    activePowerAtMoment: 100,
    frequency: 50
  }

  samarkand: Region = {
    label: 'Самарканд',
    reservoirCount: 0,
    gesCount: 5,
    aggregateCount: 15,
    activePower: 43,
    activePowerAtMoment: 40,
    frequency: 50
  }

  andijan: Region = {
    label: 'Андижан',
    reservoirCount: 1,
    gesCount: 6,
    aggregateCount: 12,
    activePower: 218,
    activePowerAtMoment: 200,
    frequency: 50
  }

  fergana: Region = {
    label: 'Фергана',
    reservoirCount: 0,
    gesCount: 1,
    aggregateCount: 2,
    activePower: 5,
    activePowerAtMoment: 2,
    frequency: 50
  }

  khorezm: Region = {
    label: 'Хорезм',
    reservoirCount: 0,
    gesCount: 1,
    aggregateCount: 6,
    activePower: 150,
    activePowerAtMoment: 100,
    frequency: 50
  }

  surkhandarya: Region = {
    label: 'Сурхандарья',
    reservoirCount: 1,
    gesCount: 1,
    aggregateCount: 2,
    activePower: 30,
    activePowerAtMoment: 20,
    frequency: 50
  }

  kashkadarya: Region = {
    label: 'Кашкадарья',
    reservoirCount: 1,
    gesCount: 1,
    aggregateCount: 2,
    activePower: 45,
    activePowerAtMoment: 30,
    frequency: 50
  }

  namangan: Region = {
    label: 'Наманган',
    reservoirCount: 0,
    gesCount: 2,
    aggregateCount: 4,
    activePower: 16,
    activePowerAtMoment: 10,
    frequency: 50
  }

  regions = [this.andijan, this.namangan, this.fergana, this.kashkadarya, this.khorezm, this.surkhandarya, this.samarkand, this.sirdarya, this.tashkent]
}
