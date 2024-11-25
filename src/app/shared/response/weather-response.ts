export interface WeatherCurrentResponse {
  main: {
    feels_like: number
    temp: number
    humidity: number
    pressure: number
  }
  clouds: {
    all: number
  }
  weather: {
    description: string
    icon: string
  }[]
  wind: {
    deg: number
    speed: number
  }
  dt: number
}

export interface WeatherCurrentDto {
  temp: string
  tempFeelsLike: string
  humidity: string
  weatherDescription: string
  weatherIcon: string
  windDirection: string
  windSpeed: number
  time: Date
  pressure: number
  clouds: number
}

export interface Forecast {
  date: Date
  dayIcon?: string
  nightIcon?: string
  dayIconDescription?: string
  nightIconDescription?: string
  dayTemperature?: string
  nightTemperature?: string
}
