import { HttpHeaders } from '@angular/common/http';

export interface RestRequestOptions<T> {
  queryParams?: {
    [param: string]: string | string[] | number | number[];
  };
  identifierParams?: string[] | number[];
  namedIdentifierParams?: {
    [param: string]: string | number;
  };
  mapResponseFn?: (res: never) => T | T[];
  headers?: HttpHeaders;
  body?: T | T[];
}
