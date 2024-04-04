import {ValueResponse} from "./response/values-response";

export interface Dataset {
  label: string
  data: number[]
  backgroundColor: string
  borderColor: string
  tension: number
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
  path?: string
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
