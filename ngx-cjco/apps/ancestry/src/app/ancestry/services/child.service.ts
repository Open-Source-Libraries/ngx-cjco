import { Injectable, Injector } from '@angular/core';
import { Child } from '../models/child.model';
import { RestResourceService } from '@rest/rest';

@Injectable({
  providedIn: 'root'
})
export class ChildService extends RestResourceService<Child> {
  constructor(injector: Injector) {
    super(Child, injector);
  }
}
