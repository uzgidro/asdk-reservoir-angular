export interface ChartData {
  name: string
  value: number
}

export interface DateChartData extends ChartData {
  date: number
}

export interface ClusterChartData extends ChartData {
  index: number
}
