import { Injectable, Injector } from '@angular/core';
import { Ancestry } from '../models/ancestry.model';
import { RestResourceService } from '@ngx-cjco/ngx-rest';

@Injectable({
  providedIn: 'root'
})
export class AncestryService extends RestResourceService<Ancestry> {
  constructor(injector: Injector) {
    super(Ancestry, injector);
  }
}
