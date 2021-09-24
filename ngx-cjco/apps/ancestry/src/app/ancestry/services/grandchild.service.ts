import { Injectable, Injector } from '@angular/core';
import { Grandchild } from '../models/grandchild.model';
import {  RestResourceService } from '@rest/rest';

@Injectable({
  providedIn: 'root'
})
export class GrandchildService extends RestResourceService<Grandchild> {
  constructor(injector: Injector) {
    super(Grandchild, injector);
  }
}
