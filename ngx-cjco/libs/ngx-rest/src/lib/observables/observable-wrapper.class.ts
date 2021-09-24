import { Observable, of, Subject, ReplaySubject, SubscribableOrPromise } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ObservableHelper } from './observable-helper.class';

export class ObservableWrapper<T> {
  public readonly data$: Observable<T>;
  public subject: Subject<T>;
  public ignoreErrors: boolean;

  constructor(options: { subject?: Subject<T>; ignoreErrors?: boolean } = {}) {
    if (!options.subject) {
      options.subject = new ReplaySubject(1);
    }
    this.subject = options.subject;
    this.ignoreErrors = options.ignoreErrors;
    this.data$ = this.subject.asObservable();
  }

  public nextAsync(item: SubscribableOrPromise<T>): Observable<void> {
    return ObservableHelper.getObservableFrom(item)
      .pipe(
        map(result => {
          this.subject.next(result);
        })
      )
      .pipe(catchError(error => (this.ignoreErrors ? of(null) : of(error))));
  }

  public next(item: T): void {
    this.subject.next(item);
  }
}
