import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {EnvService} from "../shared/service/env.service";
import {catchError, map, Observable} from "rxjs";
import {WeatherCurrentDto, WeatherCurrentResponse} from "../shared/response/weather-response";
import {WeatherService} from "./weather.service";

const BASE_URL: string = 'https://api.openweathermap.org/data/2.5'
const CURRENT: string = '/weather'
const FORECAST: string = '/forecast'


@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor(private http: HttpClient, private env: EnvService, private messageService: MessageService, private weatherService: WeatherService) {
  }

  getCurrent(lat: number, lon: number): Observable<WeatherCurrentDto> {

    return this.http.get<WeatherCurrentResponse>(BASE_URL + CURRENT, {
      params: new HttpParams().appendAll({
        'lat': lat,
        'lon': lon,
        'appid': this.env.getWeatherKey(),
        'units': 'metric',
        'lang': 'en'
      })
    }).pipe(
      map(value => this.weatherService.convertCurrentResponse(value)),
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getForecast(lat: number, lon: number): Observable<any> {

    return this.http.get(BASE_URL + FORECAST, {
      params: new HttpParams().appendAll({
        'lat': lat,
        'lon': lon,
        'appid': this.env.getWeatherKey(),
        'units': 'metric',
        'lang': 'ru'
      })
    }).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }
}
