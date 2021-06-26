import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { merge, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { ProductItem } from 'src/app/core/model/product-item.model';
import { AllproductSelector } from '../store/selectors';



/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<ProductItem> {
  data$: Observable<ProductItem[]>;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private store: Store) {
    super();
    this.data$ = store.pipe(select(AllproductSelector.selectAllProducts));
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   *
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ProductItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      // return merge(
      //   this.data$,
      //   this.paginator.page,
      //   this.sort.sortChange
      // ).pipe(map(() => this.getPagedData(this.getSortedData([...data]))));
      return merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.data$;
        }),
        map(data => this.getPagedData(this.getSortedData([...data]))));
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }
  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ProductItem[]): ProductItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ProductItem[]): ProductItem[] {
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

  /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
  private compare(
    a: string | number,
    b: string | number,
    isAsc: boolean
  ): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
