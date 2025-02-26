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
  hideBullets?: boolean
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

export interface ClusterChart extends Chart {
  index: number
}
