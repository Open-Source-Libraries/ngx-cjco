import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, } from 'rxjs';
import { Ancestry } from '../models/ancestry.model';
import { Child } from '../models/child.model';
import { Grandchild } from '../models/grandchild.model';
import { Parent } from '../models/parent.model';
import { AncestryService } from './ancestry.service';
import { ChildService } from './child.service';
import { GrandchildService } from './grandchild.service';
import { ParentService } from './parent.service';
import { RestRequestOptions } from '@ngx-cjco/ngx-rest';

@Injectable({
  providedIn: 'root'
})
export class AncestryManagementService {
  public ancestry$: BehaviorSubject<Ancestry>;
  private ancestry: Ancestry;

  constructor(
    private ancestryService: AncestryService,
    private parentService: ParentService,
    private childService: ChildService,
    private grandchildService: GrandchildService,
  ) {

    this.ancestry = new Ancestry();
    this.ancestry$ = new BehaviorSubject<Ancestry>(this.ancestry);
  }

  public getAncestry(id: number): Observable<Ancestry> {
    // this.ancestryService.list().subscribe((response: Ancestry) => {
    //   console.table(response);
    // });

    this.ancestryService.read(id).subscribe((response: Ancestry)  => {
      this.ancestry = response;
      this.ancestry$.next(this.ancestry);
      console.table(response);
    });

    return this.ancestry$;
  }

  public getGrandchildren(childId: string) {
    const options: RestRequestOptions<Grandchild> = {};
    options.identifierParams = [ childId ];
    this.grandchildService.list(options);
  }

  public saveParent(ancestryId: string, parent: Parent) {
    const options: RestRequestOptions<Parent> = {};
    options.identifierParams = [ ancestryId ];
    this.parentService.update(parent, options).subscribe(
      data => {
        parent = data as Parent;
        this.ancestry$.next(this.ancestry);
      }
    );
  }

  public saveChild(child: Child) {
    // this.childService.update(child).subscribe(
    //   data => {
    //     child = data;
    //     this.ancestry$.next(this.ancestry);
    //   }
    // );
  }

  public saveGrandchild(grandchild: Grandchild) {
    // this.grandchildService.update(grandchild).subscribe(
    //   data => {
    //     grandchild = data;
    //     this.ancestry$.next(this.ancestry);
    //   },
    //   (error: HttpCodeMessage) => {
    //     this.snackBar.open(error.message);
    //   }
    // );
  }
}
