import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AncestryRoutingModule } from './ancestry-routing.module';
import { AncestryComponent } from './ancestry.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { GrandchildComponent } from './grandchild/grandchild.component';
import { MatTreeModule } from '@angular/material/tree';


@NgModule({
  declarations: [
    AncestryComponent,
    ParentComponent,
    ChildComponent,
    GrandchildComponent
  ],
  imports: [
    CommonModule,
    AncestryRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTreeModule,
  ],
})
export class AncestryModule { }
