import { delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { ProductItem } from 'src/app/core/model/product-item.model';
import { ProductStatus } from 'src/app/core/model/product-status.enum';
import { ProductType } from 'src/app/core/model/product-type.enum';
import {
  AllProductAction,
  CreateProductAction,
  DeleteProductAction,
  UpdateProductAction,
} from '../store/actions';
import { TableDataSourceProduct } from './table-datasouce.product';
import { MatChipItem } from 'src/app/shared/mat-chip-autocomplete/mat-chip-autocomplete.component';

interface StatusOption {
  value: ProductStatus;
  viewValue: string;
}

interface TypeOption {
  value: ProductType;
  viewValue: string;
}

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProductItem>;
  dataSource: TableDataSourceProduct;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
    'name',
    'imageUrl',
    'publishDate',
    'status',
    'totalChapter',
    'type',
    'action',
  ];
  statusList: StatusOption[] = [
    { value: ProductStatus.STOPPED, viewValue: 'Stopped' },
    { value: ProductStatus.PUBLISHING, viewValue: 'Publishing' },
    { value: ProductStatus.COMPLETED, viewValue: 'Completed' },
  ];

  typeList: TypeOption[] = [
    { value: ProductType.CONVERTED, viewValue: 'Converted' },
    { value: ProductType.RAW, viewValue: 'Raw' },
    { value: ProductType.TRANSLATED, viewValue: 'Translated' },
  ];

  createProductForm: FormGroup;

  isEditing = false;
  allFruits$: Observable<MatChipItem[]> = of([
    {key: '1', value: 'Apple'},
    {key: '2', value: 'Lemon'},
    {key: '3', value: 'Lime'},
    {key: '4', value: 'Orange'},
    {key: '5', value: 'Strawberry'},
  ]).pipe(delay(3000));
  constructor(private fb: FormBuilder, private store: Store) {
    this.dataSource = new TableDataSourceProduct(store);
    this.createProductForm = fb.group({
      id: [-1],
      name: ['', Validators.required],
      totalChapter: ['', Validators.required],
      imageUrl: ['', Validators.required],
      publishDate: [new Date(), Validators.required],
      status: [ProductStatus.COMPLETED, Validators.required],
      type: [ProductType.TRANSLATED, Validators.required],
    });
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.store.dispatch(AllProductAction.loadAllProducts());
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onEditItem(row: ProductItem): void {
    this.createProductForm.patchValue({
      ...row,
      publishDate: moment(row.publishDate).toDate(),
    });
    this.isEditing = true;
  }

  onDeleteItem(id: any): void {
    console.log(id);
    this.store.dispatch(DeleteProductAction.loadDeleteProducts({ id }));
  }

  onSubmitProductForm(): void {
    if (this.isEditing == false) {
      console.log('create product', this.createProductForm.value);
      this.store.dispatch(
        CreateProductAction.createProducts({
          product: { ...this.createProductForm.value },
        })
      );
    } else {
      console.log('update product', this.createProductForm.value);
      this.store.dispatch(
        UpdateProductAction.loadUpdateProducts({
          product: this.createProductForm.value,
        })
      );
    }
  }

  getValueOfProductStatus(statusOrder: number): string {
    return this.statusList.filter((item) => item.value === statusOrder)[0]
      .viewValue;
  }

  getValueOfProductType(typeOrder: number): string {
    return this.typeList.filter((item) => item.value === typeOrder)[0]
      .viewValue;
  }

  onResetForm(): void {
    this.isEditing = false;
    this.createProductForm.patchValue({
      name: '',
      totalChapter: '',
      imageUrl: '',
      publishDate: new Date(),
      status: ProductStatus.COMPLETED,
      type: ProductType.TRANSLATED,
    });
  }
}
