import { select, Store } from '@ngrx/store';
import { ProductItem } from 'src/app/core/model/product-item.model';
import { AllproductSelector } from '../store/selectors';
import { TableDataSource } from '../../material/table-datasource';

export class TableDataSourceProduct extends TableDataSource<ProductItem> {
  constructor(private store: Store) {
    super(store.pipe(select(AllproductSelector.selectAllProducts)));
  }

  getSortedData(data: ProductItem[]): ProductItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'id':
          return this.compare(+a.id, +b.id, isAsc);
        case 'publishDate':
          return this.compare(+a.publishDate, +b.publishDate, isAsc);
        case 'totalChapter':
          return this.compare(+a.totalChapter, +b.totalChapter, isAsc);
        default:
          return 0;
      }
    });
  }
}
