import { Injectable, Injector } from '@angular/core';
import { Grandchild } from '../models/grandchild.model';
import { RestResourceService } from '@ngx-cjco/ngx-rest';

@Injectable({
  providedIn: 'root'
})
export class GrandchildService extends RestResourceService<Grandchild> {
  constructor(injector: Injector) {
    super(Grandchild, injector);
  }
}
