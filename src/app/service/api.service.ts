import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {catchError, Observable} from "rxjs";

const BASE_URL: string = 'http://127.0.0.1:8000'
const DASHBOARD: string = '/dashboard'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getDashboardValues(): Observable<any> {
    return this.http.get(BASE_URL + DASHBOARD).pipe(
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return [];
      })
    )
  }
}
