export interface ValueResponse {
  date: string
  value: number
}

export interface ComplexValueResponse {
  reservoir: string
  reservoir_id: number
  category: string
  data: ValueResponse[]
}

export interface CategorisedValueResponse {
  income: ComplexValueResponse[]
  release: ComplexValueResponse[]
  level: ComplexValueResponse[]
  volume: ComplexValueResponse[]
}
