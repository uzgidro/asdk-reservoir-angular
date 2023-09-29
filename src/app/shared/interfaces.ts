export interface Piezometer {
  _id: {
    $oid: string
  },
  fistAgVoltage:number,
  fistAgAmperage:number,
  fistAgActivePower:number,
  fistAgReactivePower:number,
  fistAgHertz:number,
  fistAgUseAmperage:number,
  fistAgUsePower:number,
  secondAgVoltage:number,
  secondAgAmperage:number,
  secondAgActivePower:number,
  secondAgReactivePower:number,
  secondAgHertz:number,
  secondAgUseAmperage:number,
  secondAgUsePower:number,
  hightLevel:number,
  lowerLevel:number,
  ag1DiffentAg2:number,
  ag2DiffentAg1:number,
  fistAgGeneratorVoltage:number,
  fistAgGeneratorAmperage:number,
  fistAgShinaVoltage:number,
  fistAgGeneratorActivePower:number,
  fistAgGeneratorReactivePower:number,
  fistAgGeneratorFlow:number,
  secondAgGeneratorVoltage:number,
  secondAgGeneratorAmperage:number,
  secondAgShinaVoltage:number,
  secondAgGeneratorActivePower:number,
  secondAgGeneratorReactivePower:number,
  secondAgGeneratorFlow:number,
  date: {
    $date: string
  },
  createdAt: {
    $date: string
  },
  updatedAt: {
    $date: string
  }
}