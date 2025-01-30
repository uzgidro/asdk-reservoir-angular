export interface ReservoirData {
  reservoirId: number;
  reservoir: string
  income: number
  incomeDifference: string
  incomeChart: any
  release: number
  releaseDifference: string
  releaseChart: any
  level: number
  levelDifference: string
  levelChart: any
  volume: number
  volumeDifference: string
  volumeChart: any
  incomeLabels: string[]
  releaseLabels: string[]
  levelLabels: string[]
  volumeLabels: string[]
  weather?: string
  temperature?: string
  windSpeed?: number
  humidity?: string
}
