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
    const stockIcon = response.weather[0].icon
    let icon: string
    switch (true) {
      case stockIcon.includes('01') :
        icon = 'skc_' + stockIcon.slice(-1)
        break
      case stockIcon.includes('02') :
        icon = 'bkn_' + stockIcon.slice(-1)
        break
      case stockIcon.includes('03') :
        icon = 'bkn_' + stockIcon.slice(-1)
        break
      case stockIcon.includes('04') :
        icon = 'ovc'
        break
      case stockIcon.includes('09') :
        icon = 'bkn_+ra_' + stockIcon.slice(-1)
        break
      case stockIcon.includes('10') :
        icon = 'bkn_-ra_' + stockIcon.slice(-1)
        break
      case stockIcon.includes('11') :
        icon = 'ovc_ts'
        break
      case stockIcon.includes('13') :
        icon = 'ovc_sn'
        break
      case stockIcon.includes('50') :
        icon = 'fg_' + stockIcon.slice(-1)
        break
      default:
        icon = 'vlka'
    }
    return {
      temp: (response.main.temp > 0 ? '+' : '') + response.main.temp.toString(),
      tempFeelsLike: (response.main.feels_like > 0 ? '+' : '') + response.main.feels_like.toString(),
      humidity: response.main.humidity.toString() + '%',
      weatherDescription: response.weather[0].description,
      weatherIcon: `https://yastatic.net/weather/i/icons/funky/dark/${icon}.svg`,
      windSpeed: response.wind.speed,
      windDirection: direction,
      time: new Date(response.dt*1000),
      pressure: response.main.pressure,
      clouds: response.clouds.all
    }
  }

}
