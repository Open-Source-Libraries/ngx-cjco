import { SubscribableOrPromise } from 'rxjs';

export type ObservableDataSource<T> = SubscribableOrPromise<T> | T | T[];
