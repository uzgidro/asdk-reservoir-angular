import {Injectable, InjectionToken} from "@angular/core";
import {environment} from "../../../environments/environment.development";

export const ENVIRONMENT = new InjectionToken<{ [key: string]: any }>('environment');
@Injectable({
  providedIn: "root"
})
export class EnvService {
  private readonly environment = environment

  getRegions() {
    return this.environment.regionId;
  }
}
