import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {interval, map, switchMap} from "rxjs";

@Injectable({providedIn: 'root'})
export class TimeService {
  private apiUrl = 'https://worldtimeapi.org/api/timezone/Asia/Tashkent';

  constructor(private http: HttpClient) {}

  getCurrentTime() {
    return this.http.get(this.apiUrl).pipe(
      map((data: any) => data['datetime'])
    );
  }

  getCurrentTimeSecond() {
    return interval(1000).pipe(
      switchMap(() => this.http.get(this.apiUrl).pipe(
        map((data: any) => data['datetime'])
      ))
    );
  }
}
