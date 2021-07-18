import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CategoryItem } from 'src/app/core/model/category-item.model';
import { TableDataSource } from 'src/app/material/table-datasource';

export class TableDataSourceCategory extends TableDataSource<CategoryItem> {
  constructor(private store: Store) {
    super(
      of([
        { id: 1, name: 'Action' },
        { id: 2, name: 'Fantasy' },
      ])
    );
  }
  getSortedData(data: CategoryItem[]): CategoryItem[] {
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
        default:
          return 0;
      }
    });
  }
}
