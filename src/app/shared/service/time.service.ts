import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class TimeService {
  private apiUrl = 'https://worldtimeapi.org/api/timezone/Asia/Tashkent';

  constructor(private http: HttpClient) {}

  getCurrentTime() {
    return this.http.get(this.apiUrl);
  }
}
