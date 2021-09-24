import { RestVersioningScheme } from '../enums/rest-versioning-scheme.enum';

export class RegisteredEndpointModel {
  public endpoint: string;
  public version: string;
  public versioningScheme: RestVersioningScheme | undefined;

  constructor(url: string, version = '') {
    this.endpoint = url;
    this.version = version;
  }
}
