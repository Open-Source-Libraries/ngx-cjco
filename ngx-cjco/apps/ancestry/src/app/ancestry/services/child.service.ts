import { Injectable, Injector } from '@angular/core';
import { Child } from '../models/child.model';
import { RestResourceService } from '@ngx-cjco/ngx-rest';

@Injectable({
  providedIn: 'root'
})
export class ChildService extends RestResourceService<Child> {
  constructor(injector: Injector) {
    super(Child, injector);
  }
}
