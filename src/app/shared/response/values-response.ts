import {ReservoirResponse} from "./reservoir-response";

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
