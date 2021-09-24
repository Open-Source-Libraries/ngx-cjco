import { RestResourceEndpoint } from './rest-resource-endpoint.model';
import { RestResourceVersion } from './rest-resource-version.model';
import { RestVersioningScheme } from '../enums/rest-versioning-scheme.enum';

export class RestResourceContext {
  public name = '';
  public domain = '';
  public versioningScheme: RestVersioningScheme | undefined;
  public versions?: RestResourceVersion[];
  public endpoints: RestResourceEndpoint[] = [];
}
