export interface Chart {
  name: string
  color?: string
}

export interface DateChart extends Chart {
  data: {
    value: number
    timestamp: number
  }[]
}

export interface ClusterChart extends Chart {
  index: number
}
