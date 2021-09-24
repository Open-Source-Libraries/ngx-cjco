import { RestResourceError } from './rest-resource-error.interface';

export interface RestResourceResponse<T> {
  data: T;
  error: RestResourceError;
}
