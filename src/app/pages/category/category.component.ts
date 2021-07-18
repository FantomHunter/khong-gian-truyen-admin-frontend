import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { CategoryItem } from 'src/app/core/model/category-item.model';
import { AllCategoryAction } from '../store/actions';
import { TableDataSourceCategory } from './table-datasource.category';

@Component({
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoryItem>;
  dataSource: TableDataSourceCategory;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'action'];
  categoryForm: FormGroup;
  isEditing = false;

  constructor(private fb: FormBuilder, private store: Store) {
    this.dataSource = new TableDataSourceCategory(store);
    this.categoryForm = fb.group({
      id: [-1],
      name: ['', Validators.required],
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {
    this.store.dispatch(AllCategoryAction.loadAllCategories());
  }

  onSubmitCategoryForm(): void {}

  onResetForm(): void {
    this.isEditing = false;
    this.categoryForm.patchValue({
      name: '',
    });
  }

  onEditItem(row: CategoryItem): void {
    this.categoryForm.patchValue({
      ...row,
    });
    this.isEditing = true;
  }

  onDeleteItem(id: number): void {
    console.log(id);
    // this.store.dispatch(DeleteProductAction.loadDeleteProducts({ id }));
  }
}
