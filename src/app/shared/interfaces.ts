import {ValueResponse} from "./response/values-response";

export interface LevelVolume {
  level: number
  volume: number
}

export interface Dataset {
  label: string
  data: number[]
  backgroundColor: string
  borderColor: string
  tension: number
  pointBackgroundColor: string
  pointBorderColor: string
  pointHoverBackgroundColor: string
  pointHoverBorderColor: string
}

export interface Region {
  label: string
  reservoirCount: number
  gesCount: number
  aggregateCount: number
  activePower: number
  activePowerAtMoment: number
  frequency: number
}

export interface Ges {
  name: string
  activePower: number
}

export interface GesValues {
  name: string
  activePower: number
  activePowerAtMoment: number
  difference: number
  reactivePower: number
  frequency: number
  waterRelease: number
  idleDischarge: number
}

export interface Aggregate {
  name: string
  installedPower: number
  valveOpenness: number
  pressure: number
  waterRelease: number
  efficiency: number
  actualEfficiency: number
  activePower: number
  difference: number
  reactivePower: number
  status: boolean
}

export interface MenuItem {
  name: string
  path: string
  externalLink?: string
  queryParams?: string
  queryParamsHandling?: string
  isActive?: boolean
  isOpen?: boolean
  children?: MenuItem[]
}

export interface Decade {
  category: string
  data: ValueResponse[][]
  statStart?: Date
  statEnd?: Date
  stat5: number[]
  stat10: number[]
  stat30: number[]
  statTotal: number[]
  statLastYear: number[]
}

export interface ValueDiff {
  value: number;
  diff: number;
}

export interface Stock {
  id: number;
  position: number;
  name: string;
  date: string;
  avg30: ValueDiff;
  avg10: ValueDiff;
  past_year: ValueDiff;
  current_year: number;
  percent30: ValueDiff;
  percent10: ValueDiff;
  past_year_percent: ValueDiff;
}

export interface Modsnow {
  name: string;
  position: number;
  current_year: string;
  current_percent: number;
  current_data: number[];
  past_year: string;
  past_percent: number;
  past_data: number[];
  diff_percent: number;
  diff_data: number[];
}

export interface ModsnowImg {
  name: string
  url: string
}
