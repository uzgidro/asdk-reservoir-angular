import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {catchError, Observable} from "rxjs";
import {
  CategorisedArrayResponse,
  CategorisedValueResponse,
  ComplexValueResponse, OperativeValueResponse,
  ReservoiredArrayResponse
} from "../shared/response/values-response";
import {ReservoirResponse} from "../shared/response/reservoir-response";
import {LevelVolume} from "../shared/interfaces";

const BASE_URL: string = 'https://speedwagon.uz'
const RESERVOIRS: string = '/reservoirs'
const RESERVOIR: string = '/reservoir'
const DASHBOARD: string = '/dashboard'
const DASHBOARD_RES: string = '/dashboard/res'
const RESERVOIR_PREFIX: string = '/reservoir'
const DECADE: string = '/decade'
const MONTH: string = '/month'
const AVG: string = '/avg'
const PAST_YEARS_AVG: string = '/past-avg'
const MAX: string = '/max'
const MIN: string = '/min'
const YEAR: string = '/year'
const APPROVED: string = '/approved'
const SELECTED: string = '/selected'
const VEGETATIVE: string = '/vegetative'
const LEVEL: string = '/level'
const LV: string = '/lv'
const OPERATIVE: string = '/operative'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getReservoirs(): Observable<ReservoirResponse[]> {
    return this.http.get<ReservoirResponse[]>(BASE_URL + RESERVOIRS).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getReservoirById(reservoirId: number): Observable<ReservoirResponse> {
    return this.http.get<ReservoirResponse>(BASE_URL + RESERVOIR + '/' + reservoirId).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return []
      })
    )
  }

  getDashboardValues(): Observable<CategorisedArrayResponse> {
    return this.http.get<CategorisedArrayResponse>(BASE_URL + DASHBOARD).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return []
      })
    );
  }

  getDashboardValuesSortedByReservoir(): Observable<ReservoiredArrayResponse[]> {
    return this.http.get<ReservoiredArrayResponse[]>(BASE_URL + DASHBOARD_RES).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return []
      })
    );
  }

  getOperativeValues(): Observable<OperativeValueResponse[]> {
    return this.http.get<OperativeValueResponse[]>(BASE_URL + OPERATIVE).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return []
      })
    );
  }

  getDecadeReservoirValues(reservoirId: number): Observable<CategorisedValueResponse> {
    return this.http.get<CategorisedValueResponse>(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + DECADE).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getTotalDecadeReservoirValues(): Observable<{ avg: ComplexValueResponse[], year: ComplexValueResponse[] }> {
    return this.http.get<{
      avg: ComplexValueResponse[],
      year: ComplexValueResponse[]
    }>(BASE_URL + RESERVOIRS + DECADE, {params: new HttpParams().set('category', 'income')}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getMonthReservoirValues(reservoirId: number): Observable<CategorisedValueResponse> {
    return this.http.get<CategorisedValueResponse>(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + MONTH).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getDecadeYearsValues(reservoirId: number): Observable<CategorisedValueResponse> {
    return this.http.get<CategorisedValueResponse>(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + DECADE + YEAR).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getVegetativeDecadeYearsValues(reservoirId: number): Observable<any> {
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + VEGETATIVE + DECADE).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getByYearValues(reservoirId: number): Observable<ComplexValueResponse> {
    return this.http.get<ComplexValueResponse>(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + YEAR, {params: new HttpParams().set('category', 'income')}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getMaxValues(reservoirId: number, category: string = 'income'): Observable<ComplexValueResponse> {
    return this.http.get<ComplexValueResponse>(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + MAX, {params: new HttpParams().set('category', category)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }


  getMinValues(reservoirId: number, category: string = 'income'): Observable<ComplexValueResponse> {
    return this.http.get<ComplexValueResponse>(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + MIN, {params: new HttpParams().set('category', category)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getAvgValues(reservoirId: number): Observable<ComplexValueResponse> {
    return this.http.get<ComplexValueResponse>(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + AVG, {params: new HttpParams().set('category', 'income')}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getTenYearsAvgValues(reservoirId: number): Observable<ComplexValueResponse> {
    return this.http.get<ComplexValueResponse>(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + PAST_YEARS_AVG, {params: new HttpParams().set('category', 'income').set('years', 10)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getSelectedYearValues(reservoirId: number, year: number): Observable<ComplexValueResponse> {
    return this.http.get<ComplexValueResponse>(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + SELECTED, {params: new HttpParams().set('category', 'income').set('year', year)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getApprovedSchedule(reservoirId: number): Observable<{
    income: number,
    release: number,
    level: number,
    volumeStart: number,
    volumeEnd: number
  }[]> {
    return this.http.get<{
      income: number,
      release: number,
      level: number,
      volumeStart: number,
      volumeEnd: number
    }[]>(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + VEGETATIVE + APPROVED).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getLv(reservoirId: number): Observable<LevelVolume[]> {
    return this.http.get<LevelVolume[]>(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + LV).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message});
        return [];
      })
    )
  }

  getLevelForecast(reservoirId: number, forecast: number[]): Observable<any> {

    let params = new HttpParams().set('forecast', forecast.join(','));
    return this.http.get(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + VEGETATIVE + LEVEL, {params: params}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message});
        return [];
      })
    )
  }

  getVegetativeMinValues(reservoirId: number, category: string = 'income'): Observable<ComplexValueResponse> {
    return this.http.get<ComplexValueResponse>(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + VEGETATIVE + MIN, {params: new HttpParams().set('category', category)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getVegetativeMaxValues(reservoirId: number, category: string = 'income'): Observable<ComplexValueResponse> {
    return this.http.get<ComplexValueResponse>(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + VEGETATIVE + MAX, {params: new HttpParams().set('category', category)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getVegetativeSelectedValues(reservoirId: number, category: string = 'income', year: number[]): Observable<ComplexValueResponse> {
    let params = new HttpParams();
    params = params.append('category', category)
    params = params.append('year', year.join(','));
    return this.http.get<ComplexValueResponse>(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + VEGETATIVE + SELECTED, {params}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }


  getThisYearValues(reservoirId: number): Observable<CategorisedValueResponse> {
    return this.http.get<CategorisedValueResponse>(BASE_URL + RESERVOIR_PREFIX + '/' + reservoirId + VEGETATIVE + DECADE).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }
}
