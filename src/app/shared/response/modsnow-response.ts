export interface ModsnowPercentResponse {
  name: string
  percent: number
}

export interface ModsnowImageResponse {
  name: string
  url: string
}

export interface ModsnowYearsComparatin {
  current: number[]
  previous: number[]
  labels: string[]
}
