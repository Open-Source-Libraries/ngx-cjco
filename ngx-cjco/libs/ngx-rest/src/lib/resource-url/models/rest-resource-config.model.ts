import { RestResourceEnvironment } from './rest-resource-environment.model';
import { RestResourceContext } from './rest-resource-context.model';

export class RestResourceConfig {
  public environments: RestResourceEnvironment[] = [];
  public contexts: RestResourceContext[] = [];
  public resourceEnvironment = '';
}
