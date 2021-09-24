import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { ResourceUrlService } from '../../resource-url/resource-url.service';

export abstract class RestResourceBaseService {
  protected httpClient: HttpClient;
  protected resourceUrlService: ResourceUrlService;

  protected constructor(injector: Injector) {
    this.httpClient = injector.get(HttpClient);
    this.resourceUrlService = injector.get(ResourceUrlService);
  }

  protected getHeaders(version: string, headers = new HttpHeaders()): HttpHeaders {
    headers.append('version', version);
    return headers;
  }

  protected createInstance<R extends T | T[], T>(
    type: new (object?: T) => T,
    data: T
  ): R | R[] {
    const deserializedObject = (new type() as R | R[]);
    if (deserializedObject === undefined) {
      return new type() as R;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const blah = deserializedObject.fromJson(data);
    return blah;
  }
}
