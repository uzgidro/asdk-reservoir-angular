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
    const dig = response.wind.deg
    if (dig < 23 || dig > 338) {
      direction = 'north'
    } else if (dig < 68) {
      direction = 'north_east'
    } else if (dig < 113) {
      direction = 'east'
    } else if (dig < 158) {
      direction = 'south_east'
    } else if (dig < 203) {
      direction = 'south'
    } else if (dig < 248) {
      direction = 'south_west'
    } else if (dig < 293) {
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
      windDirection: direction
    }
  }

}
