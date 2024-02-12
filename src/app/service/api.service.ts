import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {catchError, Observable} from "rxjs";

const BASE_URL: string = 'http://127.0.0.1:8000'
const RESERVOIRS: string = '/reservoirs'
const DASHBOARD: string = '/dashboard'
const RESERVOIR_PREFIX: string = '/reservoir'
const CURRENT: string = '/current'
const DECADE : string = '/decade'

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
}
