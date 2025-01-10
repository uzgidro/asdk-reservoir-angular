import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {catchError, Observable} from "rxjs";
import {ModsnowImageResponse, ModsnowPercentResponse} from "../shared/response/modsnow-response";

const BASE_URL: string = 'https://speedwagon.uz'
const MODSNOW: string = '/snow'
const PERCENT: string = '/percent'
const COVER: string = '/cover'
const DYNAMICS: string = '/dynamics'

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
