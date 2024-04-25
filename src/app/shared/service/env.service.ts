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

  getReservoirs() {
    return this.environment.regionId.filter(item => item.lowerLevel != null)
  }

  getRegionByName(name: string) {
    return this.environment.regionId.find(item => item.name == name)
  }

  getWeatherKey() {
    return this.environment.weatherApiKey
  }
}
