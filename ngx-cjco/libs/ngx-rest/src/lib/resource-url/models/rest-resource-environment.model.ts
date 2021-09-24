import { RestResourceVersion } from './rest-resource-version.model';
import { RestResourceContext } from './rest-resource-context.model';
import { RestVersioningScheme } from '../enums/rest-versioning-scheme.enum';

export class RestResourceEnvironment {
  public name = '';
  public domain?: string | undefined;
  public versioningScheme: RestVersioningScheme | undefined;
  public versions?: RestResourceVersion[] | undefined;
  public contexts: RestResourceContext[] = [];
}
