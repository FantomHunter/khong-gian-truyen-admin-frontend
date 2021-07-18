import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export abstract class TableDataSource<T> extends DataSource<T> {
  // private data$: Observable<T[]>;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private _data$: Observable<T[]>) {
    super();
    this._data$ = _data$;
    // this.data$ = store.pipe(select(AllproductSelector.selectAllProducts));
  }

  public get data$(){
    return this._data$;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   *
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<T[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      // return merge(
      //   this.data$,
      //   this.paginator.page,
      //   this.sort.sortChange
      // ).pipe(map(() => this.getPagedData(this.getSortedData([...data]))));
      return merge(this.sort.sortChange, this.paginator.page).pipe(
        startWith({}),
        switchMap(() => {
          return this._data$;
        }),
        map((data) => this.getPagedData(this.getSortedData([...data])))
      );
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
  private getPagedData(data: T[]): T[] {
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
  abstract getSortedData(data: T[]): T[];

  /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
  public compare(
    a: string | number,
    b: string | number,
    isAsc: boolean
  ): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
