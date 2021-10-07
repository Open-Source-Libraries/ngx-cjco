import { Injectable, Injector } from '@angular/core';
import { Parent } from '../models/parent.model';
import { RestResourceService } from '@ngx-cjco/ngx-rest';

@Injectable({
  providedIn: 'root'
})
export class ParentService extends RestResourceService<Parent> {
  constructor(injector: Injector) {
    super(Parent, injector);
  }
}
