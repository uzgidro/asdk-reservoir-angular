import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {catchError, Observable} from "rxjs";
import {
  ModsnowImageResponse,
  ModsnowPercentResponse,
  ModsnowYearsComparatin
} from "../shared/response/modsnow-response";

const BASE_URL: string = 'https://speedwagon.uz'
const MODSNOW: string = '/snow'
const PERCENT: string = '/percent'
const COVER: string = '/cover'
const DYNAMICS: string = '/dynamics'
const COMPARATION: string = '/comparation'

@Injectable({
  providedIn: 'root'
})
export class ModsnowService {

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getPercent(): Observable<ModsnowPercentResponse[]> {
    return this.http.get<ModsnowPercentResponse[]>(BASE_URL + MODSNOW + PERCENT).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getYearsComparation(reservoir: string): Observable<ModsnowYearsComparatin> {
    return this.http.get<ModsnowYearsComparatin>(BASE_URL + MODSNOW + COMPARATION, {params: new HttpParams().set('reservoir', reservoir)}).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getCover(): Observable<ModsnowImageResponse[]> {
    return this.http.get<ModsnowImageResponse[]>(BASE_URL + MODSNOW + COVER).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }

  getDynamics(): Observable<ModsnowImageResponse[]> {
    return this.http.get<ModsnowImageResponse[]>(BASE_URL + MODSNOW + DYNAMICS).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }
}
