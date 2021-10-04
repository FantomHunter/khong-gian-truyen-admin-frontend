import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { MatChipAutocompleteComponent } from './mat-chip-autocomplete/mat-chip-autocomplete.component';

@NgModule({
  declarations: [MatChipAutocompleteComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [MatChipAutocompleteComponent],
})
export class SharedModule {}
