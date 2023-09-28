import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Piezometer} from "../interfaces";

@Injectable({providedIn: 'root'})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getGesValues() {
    return this.http.get<Piezometer>(
      `http://localhost:5000/api/v1/piezo`
    )

  }
}
