import { Observable, isObservable, from, of } from 'rxjs';
import { ObservableDataSource } from '../core/types/observable-data-source.type';

export class ObservableHelper {
  public static getObservableFrom<S>(source: ObservableDataSource<S>): Observable<S> {
    if (isObservable(source)) {
      return source as Observable<S>;
    } else if (source instanceof Promise) {
      return from(source as Promise<S>);
    } else {
      return of(source as S);
    }
  }
}
