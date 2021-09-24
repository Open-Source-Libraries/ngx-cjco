import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule, MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  declarations: [

  ],
  exports: [
  ],
})
export class SharedModule {}
