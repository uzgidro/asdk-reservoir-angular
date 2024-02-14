export interface WeatherCurrentResponse {
  main: {
    feels_like: number
    temp: number
    humidity: number
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
  temp: number
  tempFeelsLike: number
  humidity: number
  weatherDescription: string
  weatherIcon: string
  windDirection: string
  windSpeed: number
  time: Date
}
