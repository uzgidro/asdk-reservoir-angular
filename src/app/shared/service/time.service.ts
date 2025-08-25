import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {interval, map, startWith, switchMap} from "rxjs";

@Injectable({providedIn: 'root'})
export class TimeService {
  private apiUrl = 'https://timeapi.io/api/time/current/zone?timeZone=Asia/Samarkand';

  constructor(private http: HttpClient) {}

  getCurrentTime() {
    return this.http.get(this.apiUrl).pipe(
      map((data: any) => data['dateTime'])
    );
  }

  getCurrentTimeSecond() {
    return this.http.get(this.apiUrl).pipe(
      // Извлекаем начальное значение dateTime из ответа сервера
      map((data: any) => new Date(data['dateTime']).getTime()),
      // Переходим в интервал, который будет прибавлять одну секунду к исходному времени
      switchMap((initialTime) =>
        interval(1000).pipe(
          // Запускаем с начального значения
          startWith(0),
          // Увеличиваем исходное значение времени на каждую секунду
          map((seconds) => new Date(initialTime + seconds * 1000))
        )
      )
    );
  }
}
