import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {catchError, Observable} from "rxjs";

const BASE_URL: string = 'http://127.0.0.1:8000'
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
    return this.http.get(BASE_URL + RESERVOIRS + DECADE).pipe(
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

  getByYearValues(reservoirId: number): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + YEAR, {params: new HttpParams().set('category', 'income')}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getMaxValues(reservoirId: number): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + MAX, {params: new HttpParams().set('category', 'income')}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getMinValues(reservoirId: number): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + MIN, {params: new HttpParams().set('category', 'income')}).pipe(
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
}
