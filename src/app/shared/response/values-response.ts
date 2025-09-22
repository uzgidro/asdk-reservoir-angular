import {ReservoirResponse} from "./reservoir-response";

export interface ValueResponse {
  date: string
  value: number
  avg_income: number
}

export interface AnalyticsResponse {
  reservoir_id: number
  reservoir: string
  years: ValueResponse
  current_year: ValueResponse
  past_year: ValueResponse
  min: ValueResponse
  max: ValueResponse
  avg: ValueResponse
  ten_avg: ValueResponse
}

export interface ComplexValueResponse {
  reservoir: string
  reservoir_id: number
  data: ValueResponse[]
}

export interface CategorisedArrayResponse {
  income: ComplexValueResponse[]
  release: ComplexValueResponse[]
  level: ComplexValueResponse[]
  volume: ComplexValueResponse[]
}

export interface ReservoiredArrayResponse {
  reservoir: ReservoirResponse
  income: ComplexValueResponse
  release: ComplexValueResponse
  level: ComplexValueResponse
  volume: ComplexValueResponse
}

export interface CategorisedValueResponse {
  income: ComplexValueResponse
  release: ComplexValueResponse
  level: ComplexValueResponse
  volume: ComplexValueResponse
}

export interface OperativeValueResponse {
  name: string
  income: {
    date: string
    value: number
  }[]
  release: {
    date: string
    value: number
  }[]
  level: {
    date: string
    value: number
  }[]
  volume: {
    date: string
    value: number
  }[]
}
