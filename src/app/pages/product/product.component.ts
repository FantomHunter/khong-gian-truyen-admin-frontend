import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductStatus } from 'src/app/core/model/product-status.enum';
import { ProductType } from 'src/app/core/model/product-type.enum';
import { TableDataSource, ProductTableItem } from './table-datasource';
import * as moment from 'moment';

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
  @ViewChild(MatTable) table!: MatTable<ProductTableItem>;
  dataSource: TableDataSource;

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

  isEditing: boolean = false;
  constructor(fb: FormBuilder) {
    this.dataSource = new TableDataSource();
    this.createProductForm = fb.group({
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
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onEditItem(row: ProductTableItem) {
    this.createProductForm.patchValue({
      ...row,
      publishDate: moment(row.publishDate).toDate(),
    });
    this.isEditing = true;
  }

  onDeleteItem(id: any) {
    console.log(id);
  }

  onCreateNewProduct() {
    console.log('product form', this.createProductForm.value);
  }

  getValueOfProductStatus(number: number) {
    return this.statusList.filter((item) => item.value == number)[0].viewValue;
  }

  getValueOfProductType(number: number) {
    return this.typeList.filter((item) => item.value == number)[0].viewValue;
  }

  onResetForm() {
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
