import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {MessageService} from "primeng/api";
import {catchError, map, Observable, of} from "rxjs";
import {WeatherCurrentDto, WeatherCurrentResponse} from "../shared/response/weather-response";
import {WeatherService} from "./weather.service";

const BASE_URL: string = 'https://prime.speedwagon.uz/api/v3/weather'
const CURRENT: string = '/weather'
const FORECAST: string = '/forecast'


@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor(private http: HttpClient, private messageService: MessageService, private weatherService: WeatherService) {
  }

  getCurrent(lat: number, lon: number): Observable<WeatherCurrentDto> {
    return this.http.get<WeatherCurrentResponse>(BASE_URL + CURRENT, {
      params: new HttpParams().appendAll({
        'lat': lat,
        'lon': lon,
      })
    }).pipe(
      map(value => this.weatherService.convertCurrentResponse(value)),
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of({} as WeatherCurrentDto)
      })
    )
  }

  getForecast(lat: number, lon: number): Observable<any> {
    return this.http.get(BASE_URL + FORECAST, {
      params: new HttpParams().appendAll({
        'lat': lat,
        'lon': lon,
      })
    }).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of([])
      })
    )
  }
}
