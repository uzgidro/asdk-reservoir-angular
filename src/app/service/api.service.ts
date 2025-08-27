import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {catchError, Observable, of} from "rxjs";
import {
  CategorisedArrayResponse,
  CategorisedValueResponse,
  ComplexValueResponse,
  OperativeValueResponse,
  ReservoiredArrayResponse
} from "../shared/response/values-response";
import {ReservoirResponse} from "../shared/response/reservoir-response";
import {LevelVolume, Modsnow, ModsnowImg, Stock} from "../shared/interfaces";

const BASE_URL_V2: string = 'https://srmt-back.speedwagon.uz'
const BASE_URL_V3: string = 'https://prime.speedwagon.uz/api/v3'
const RESERVOIR: string = '/reservoir'
const LIST: string = '/list'
const VALUE: string = '/value'
const CURRENT: string = '/current'
const DECADE: string = '/decade'
const MONTH: string = '/month'
const AVG: string = '/avg'
const TEN_YEARS_AVG: string = '/ten-avg'
const MAX: string = '/max'
const MIN: string = '/min'
const YEAR: string = '/year'
const YEARS: string = '/years'
const LV: string = '/lv'
const OPERATIVE: string = '/operative'

const STOCK: string = '/stock'
const MODSNOW: string = '/modsnow'
const COVER: string = '/cover'
const DYNAMICS: string = '/dynamics'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  // Reservoir
  getReservoirs(): Observable<ReservoirResponse[]> {
    return this.http.get<ReservoirResponse[]>(BASE_URL_V2 + RESERVOIR + LIST).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of([]);
      })
    )
  }

  getReservoirById(reservoirId: number): Observable<ReservoirResponse> {
    return this.http.get<ReservoirResponse>(BASE_URL_V2 + RESERVOIR + '/' + reservoirId).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of({} as ReservoirResponse)
      })
    )
  }

  // Stcok
  getStock(): Observable<Stock[]> {
    return this.http.get<Stock[]>(BASE_URL_V3 + STOCK).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of([]);
      })
    )
  }

  // Modsnow
  getModsnow(): Observable<Modsnow[]> {
    return this.http.get<Modsnow[]>(BASE_URL_V3 + MODSNOW).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of([]);
      })
    )
  }

  getModsnowCover(): Observable<ModsnowImg[]> {
    return this.http.get<ModsnowImg[]>(BASE_URL_V3 + MODSNOW + COVER).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of([]);
      })
    )
  }

  getModsnowDynamics(): Observable<ModsnowImg[]> {
    return this.http.get<ModsnowImg[]>(BASE_URL_V3 + MODSNOW + DYNAMICS).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of([]);
      })
    )
  }


  // Dashboard
  getDashboardValues(): Observable<CategorisedArrayResponse> {
    return this.http.get<CategorisedArrayResponse>(BASE_URL_V2 + VALUE + CURRENT).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of({} as CategorisedArrayResponse);
      })
    );
  }

  getDashboardValuesSortedByReservoir(): Observable<ReservoiredArrayResponse[]> {
    return this.http.get<ReservoiredArrayResponse[]>(BASE_URL_V2 + VALUE + RESERVOIR).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of([]);
      })
    );
  }

  getOperativeValues(): Observable<OperativeValueResponse[]> {
    return this.http.get<OperativeValueResponse[]>(BASE_URL_V2 + VALUE + OPERATIVE).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of([]);
      })
    );
  }

  getDecadeReservoirValues(reservoirId: number): Observable<CategorisedValueResponse> {
    return this.http.get<CategorisedValueResponse>(BASE_URL_V2 + VALUE + DECADE, {params: new HttpParams().set('id', reservoirId)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of({} as CategorisedValueResponse);
      })
    )
  }

  getMonthReservoirValues(reservoirId: number): Observable<CategorisedValueResponse> {
    return this.http.get<CategorisedValueResponse>(BASE_URL_V2 + VALUE + MONTH, {params: new HttpParams().set('id', reservoirId)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of({} as CategorisedValueResponse);
      })
    )
  }

  getDecadeYearsValues(reservoirId: number): Observable<CategorisedValueResponse> {
    return this.http.get<CategorisedValueResponse>(BASE_URL_V2 + VALUE + YEAR + DECADE, {params: new HttpParams().set('id', reservoirId)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of({} as CategorisedValueResponse);
      })
    )
  }


  // Analytics
  getByYearValues(reservoirId: number): Observable<ComplexValueResponse> {
    return this.http.get<ComplexValueResponse>(BASE_URL_V2 + VALUE + YEARS, {params: new HttpParams().set('id', reservoirId)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of({} as ComplexValueResponse);
      })
    )
  }

  getMaxValues(reservoirId: number): Observable<ComplexValueResponse> {
    return this.http.get<ComplexValueResponse>(BASE_URL_V2 + VALUE + MAX, {params: new HttpParams().set('id', reservoirId)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of({} as ComplexValueResponse);
      })
    )
  }

  getMinValues(reservoirId: number): Observable<ComplexValueResponse> {
    return this.http.get<ComplexValueResponse>(BASE_URL_V2 + VALUE + MIN, {params: new HttpParams().set('id', reservoirId)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of({} as ComplexValueResponse);
      })
    )
  }

  getAvgValues(reservoirId: number): Observable<ComplexValueResponse> {
    return this.http.get<ComplexValueResponse>(BASE_URL_V2 + VALUE + AVG, {params: new HttpParams().set('id', reservoirId)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of({} as ComplexValueResponse);
      })
    )
  }

  getTenYearsAvgValues(reservoirId: number): Observable<ComplexValueResponse> {
    return this.http.get<ComplexValueResponse>(BASE_URL_V2 + VALUE + TEN_YEARS_AVG, {params: new HttpParams().set('id', reservoirId)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of({} as ComplexValueResponse);
      })
    )
  }

  getSelectedYearValues(reservoirId: number, year: number): Observable<ComplexValueResponse> {
    return this.http.get<ComplexValueResponse>(BASE_URL_V2 + VALUE + YEAR, {params: new HttpParams().set('id', reservoirId).set('year', year)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return of({} as ComplexValueResponse);
      })
    )
  }

  // Level-volume
  getLv(reservoirId: number): Observable<LevelVolume[]> {
    return this.http.get<LevelVolume[]>(BASE_URL_V2 + LV + '/' + reservoirId).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message});
        return of([]);
      })
    )
  }
}
