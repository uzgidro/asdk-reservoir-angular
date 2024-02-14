import {Injectable} from '@angular/core';
import {WeatherCurrentDto, WeatherCurrentResponse} from "../shared/response/weather-response";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() {
  }

  convertCurrentResponse(response: WeatherCurrentResponse): WeatherCurrentDto {
    let direction: string
    const deg = response.wind.deg
    if (deg < 23 || deg > 338) {
      direction = 'north'
    } else if (deg < 68) {
      direction = 'north_east'
    } else if (deg < 113) {
      direction = 'east'
    } else if (deg < 158) {
      direction = 'south_east'
    } else if (deg < 203) {
      direction = 'south'
    } else if (deg < 248) {
      direction = 'south_west'
    } else if (deg < 293) {
      direction = 'west'
    } else {
      direction = 'north_west'
    }
    return {
      temp: response.main.temp,
      tempFeelsLike: response.main.feels_like,
      humidity: response.main.humidity,
      weatherDescription: response.weather[0].description,
      weatherIcon: response.weather[0].icon,
      windSpeed: response.wind.speed,
      windDirection: direction,
      time: new Date(response.dt*1000)
    }
  }

}
