export interface Piezometer {
  _id: {
    $oid: string
  }
  fistAgVoltage:number
  fistAgAmperage:number
  fistAgActivePower:number
  fistAgReactivePower:number
  fistAgHertz:number
  fistAgUseAmperage:number
  fistAgUsePower:number
  secondAgVoltage:number
  secondAgAmperage:number
  secondAgActivePower:number
  secondAgReactivePower:number
  secondAgHertz:number
  secondAgUseAmperage:number
  secondAgUsePower:number
  hightLevel:number
  lowerLevel:number
  ag1DiffentAg2:number
  ag2DiffentAg1:number
  fistAgGeneratorVoltage:number
  fistAgGeneratorAmperage:number
  fistAgShinaVoltage:number
  fistAgGeneratorActivePower:number
  fistAgGeneratorReactivePower:number
  fistAgGeneratorFlow:number
  secondAgGeneratorVoltage:number
  secondAgGeneratorAmperage:number
  secondAgShinaVoltage:number
  secondAgGeneratorActivePower:number
  secondAgGeneratorReactivePower:number
  secondAgGeneratorFlow:number
  date: {
    $date: string
  }
  createdAt: {
    $date: string
  }
  updatedAt: {
    $date: string
  }
}

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
  isActive?: boolean
  children?: MenuItem[]
}
