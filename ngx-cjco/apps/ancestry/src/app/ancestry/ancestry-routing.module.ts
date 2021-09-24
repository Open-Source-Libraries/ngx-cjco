import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AncestryComponent } from './ancestry.component';

const routes: Routes = [
  {
    path: '',
    component: AncestryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AncestryRoutingModule { }
