import { Injectable } from '@angular/core';
import { RestResourceConfig } from './resource-url/models/rest-resource-config.model';

@Injectable({
  providedIn: "root"
})
export class RestServiceOptions {
  public restResourceConfig: RestResourceConfig | undefined = new RestResourceConfig();
  public resourceEnvironment: string | undefined;
}
