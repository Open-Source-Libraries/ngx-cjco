import { RestResourceVersion } from './rest-resource-version.model';
import { RestVersioningScheme } from '../enums/rest-versioning-scheme.enum';
import { RestIdentifierScheme } from '../enums/rest-identifier-scheme.enum';

export class RestResourceEndpoint {
  public resource = '';
  public url = '';
  public versioningScheme: RestVersioningScheme = RestVersioningScheme.None;
  public versions?: RestResourceVersion[];
  public identifierScheme: RestIdentifierScheme = RestIdentifierScheme.Array;
}
