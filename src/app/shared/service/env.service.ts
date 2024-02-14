import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: "root"
})
export class EnvService {
  private readonly environment = environment

  getRegions() {
    return this.environment.regionId;
  }

  getWeatherKey() {
    return this.environment.weatherApiKey
  }
}
