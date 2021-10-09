import { COMMA, ENTER, F } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormControlDirective,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

export interface MatChipItem {
  key: string;
  value: string;
}

@Component({
  selector: 'app-mat-chip-autocomplete',
  templateUrl: './mat-chip-autocomplete.component.html',
  styleUrls: ['./mat-chip-autocomplete.component.css'],
})
export class MatChipAutocompleteComponent implements OnInit {
  /** mat-chip data */
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<MatChipItem[]>;
  // fruits: string[] = ['Lemon'];
  chipListCtrl = new FormControl([]);
  // allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  @Input() allFruits: MatChipItem[] = [];
  @Input() parentForm!: FormGroup;

  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto')
  matAutocomplete!: MatAutocomplete;

  constructor() {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allFruits.slice()
      )
    );
    this.chipListCtrl.valueChanges
      .pipe(tap((value) => console.log('chipListCtrl: ', value)))
      .subscribe();
  }

  ngOnInit(): void {
    this.parentForm.addControl('chipListCtrl', this.chipListCtrl);
  }

  // start mat-chip
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      const val = [...this.chipListCtrl.value, value];
      this.chipListCtrl.setValue(val);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.chipListCtrl.value.indexOf(fruit);

    if (index >= 0) {
      const val = [...this.chipListCtrl.value];
      val.splice(index, 1);
      this.chipListCtrl.setValue(val);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const val = [...this.chipListCtrl.value];
    val.push(event.option.value);
    this.chipListCtrl.setValue(val);

    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(item: string | MatChipItem): MatChipItem[] {
    let filterValue = '';
    if (typeof item === 'string') {
      filterValue = item.toLowerCase();
    }else{
      filterValue = item.value
    }

    return this.allFruits.filter(
      (fruit) => fruit.value.toLowerCase().indexOf(filterValue) === 0
    );
  }

  getChipListValue(): string[] {
    return [...this.chipListCtrl.value].map((item) => item.value);
  }
  // end mat-chip
}
