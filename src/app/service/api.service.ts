import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {catchError, forkJoin, Observable, ObservableInput, throwError} from "rxjs";

const BASE_URL: string = 'https://speedwagon.uz'
const RESERVOIRS: string = '/reservoirs'
const RESERVOIR: string = '/reservoir'
const DASHBOARD: string = '/dashboard'
const RESERVOIR_PREFIX: string = '/reservoir'
const CURRENT: string = '/current'
const DECADE: string = '/decade'
const MONTH: string = '/month'
const AVG: string = '/avg'
const MAX: string = '/max'
const MIN: string = '/min'
const YEAR: string = '/year'
const SELECTED: string = '/selected'
const VEGETATIVE: string = '/vegetative'
const LEVEL: string = '/level'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getReservoirs(): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIRS).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getReservoirById(reservoirId: number): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR + '/' + reservoirId).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getDashboardValues(): Observable<any> {
    return this.http.get(BASE_URL + DASHBOARD).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getCurrentReservoirValues(reservoirId: number): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + CURRENT).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getDecadeReservoirValues(reservoirId: number): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + DECADE).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getTotalDecadeReservoirValues(): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIRS + DECADE, {params: new HttpParams().set('category', 'income')}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getMonthReservoirValues(reservoirId: number): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + MONTH).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getDecadeYearsValues(reservoirId: number): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + DECADE + YEAR).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getVegetativeDecadeYearsValues(reservoirId: number): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + VEGETATIVE + DECADE ).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getByYearValues(reservoirId: number): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + YEAR, {params: new HttpParams().set('category', 'income')}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getMaxValues(reservoirId: number, category: string = 'income'): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + MAX, {params: new HttpParams().set('category', category)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }


  getMinValues(reservoirId: number, category: string = 'income'): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + MIN, {params: new HttpParams().set('category', category)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getAvgValues(reservoirId: number): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + AVG, {params: new HttpParams().set('category', 'income')}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getSelectedYearValues(reservoirId: number, year: number): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + SELECTED, {params: new HttpParams().set('category', 'income').set('year', year)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }



  getLevelForecast(reservoirId: number, forecast: number[]): Observable<any> {

    let params = new HttpParams().set('forecast', forecast.join(','));
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + VEGETATIVE + LEVEL, { params: params }).pipe(
      catchError((error) => {
        this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: error.message });
        return [];
      })
    )
  }

  getVegetativeMinValues(reservoirId: number, category: string = 'income'): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + VEGETATIVE + MIN, {params: new HttpParams().set('category', category)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }
  getVegetativeMaxValues(reservoirId: number, category: string = 'income'): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + VEGETATIVE + MAX, {params: new HttpParams().set('category', category)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getVegetativeSelectedValues(reservoirId: number, category: string = 'income',year:number): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + VEGETATIVE + SELECTED, {params: new HttpParams().set('category', category).set('year',year)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  }



