export interface Chart {
  name: string
  color?: string
  bulletColor?: string
}

export interface DateChart {
  seriesName: string
  color?: string
  bulletColor?: string
  data: {
    value: number
    timestamp: number
  }[]
}

export interface CategoryChart extends Chart {
  data: CategoryData[]
}

export interface CategoryData  {
  seriesName: string
  value: number
  color?: string
  bulletColor?: string
}

export interface Options {
  hideBullets?: boolean
  hideLegend?: boolean
  legendPosition?: 'top' | 'bottom'
}
