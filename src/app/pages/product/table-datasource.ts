import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ProductStatus } from 'src/app/core/model/product-status.enum';
import { ProductType } from 'src/app/core/model/product-type.enum';

// TODO: Replace this with your own data model type
export interface ProductTableItem {
  name: string;
  id: number;
  imageUrl: string;
  publishDate: number;
  status: ProductStatus;
  totalChapter: number;
  type: ProductType;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ProductTableItem[] = [
  {
    "id": 0,
    "name": "Austin",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1560420358922,
    "totalChapter": 342,
    "status": ProductStatus.COMPLETED,
    "type": ProductType.RAW,
  },
  {
    "id": 1,
    "name": "Stevenson",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1453594098945,
    "totalChapter": 596,
    "status": ProductStatus.STOPPED,
    "type": ProductType.TRANSLATED
  },
  {
    "id": 2,
    "name": "Nancy",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1422534765506,
    "totalChapter": 361,
    "status": ProductStatus.PUBLISHING,
    "type": ProductType.RAW
  },
  {
    "id": 3,
    "name": "Mcknight",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1445588010267,
    "totalChapter": 532,
    "status": ProductStatus.STOPPED,
    "type": ProductType.TRANSLATED
  },
  {
    "id": 4,
    "name": "Goodman",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1463702608885,
    "totalChapter": 723,
    "status": ProductStatus.PUBLISHING,
    "type": ProductType.RAW
  },
  {
    "id": 5,
    "name": "Gabriela",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1598603195975,
    "totalChapter": 359,
    "status": ProductStatus.PUBLISHING,
    "type": ProductType.TRANSLATED
  },
  {
    "id": 6,
    "name": "Rhodes",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1400822635783,
    "totalChapter": 956,
    "status": ProductStatus.PUBLISHING,
    "type": ProductType.TRANSLATED
  },
  {
    "id": 7,
    "name": "Horn",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1497748229239,
    "totalChapter": 398,
    "status": ProductStatus.STOPPED,
    "type": ProductType.CONVERTED
  },
  {
    "id": 8,
    "name": "Ana",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1538088066921,
    "totalChapter": 992,
    "status": ProductStatus.PUBLISHING,
    "type": ProductType.TRANSLATED
  },
  {
    "id": 9,
    "name": "Curtis",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1521993161967,
    "totalChapter": 293,
    "status": ProductStatus.COMPLETED,
    "type": ProductType.RAW
  },
  {
    "id": 10,
    "name": "Bonner",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1482814673455,
    "totalChapter": 747,
    "status": ProductStatus.STOPPED,
    "type": ProductType.CONVERTED
  },
  {
    "id": 11,
    "name": "Isabel",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1542952244170,
    "totalChapter": 617,
    "status": ProductStatus.COMPLETED,
    "type": ProductType.RAW
  },
  {
    "id": 12,
    "name": "Spence",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1445555845662,
    "totalChapter": 506,
    "status": ProductStatus.PUBLISHING,
    "type": ProductType.CONVERTED
  },
  {
    "id": 13,
    "name": "Castro",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1415823848890,
    "totalChapter": 375,
    "status": ProductStatus.PUBLISHING,
    "type": ProductType.RAW
  },
  {
    "id": 14,
    "name": "Eula",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1420392164159,
    "totalChapter": 668,
    "status": ProductStatus.STOPPED,
    "type": ProductType.RAW
  },
  {
    "id": 15,
    "name": "Moss",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1584716463497,
    "totalChapter": 536,
    "status": ProductStatus.PUBLISHING,
    "type": ProductType.RAW
  },
  {
    "id": 16,
    "name": "Brady",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1392951259814,
    "totalChapter": 479,
    "status": ProductStatus.STOPPED,
    "type": ProductType.CONVERTED
  },
  {
    "id": 17,
    "name": "Mccray",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1512876567638,
    "totalChapter": 802,
    "status": ProductStatus.PUBLISHING,
    "type": ProductType.CONVERTED
  },
  {
    "id": 18,
    "name": "Alana",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1428848687488,
    "totalChapter": 579,
    "status": ProductStatus.PUBLISHING,
    "type": ProductType.CONVERTED
  },
  {
    "id": 19,
    "name": "Solomon",
    "imageUrl": "http://placehold.it/32x32",
    "publishDate": 1493305139947,
    "totalChapter": 276,
    "status": ProductStatus.PUBLISHING,
    "type": ProductType.CONVERTED
  }
];

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<ProductTableItem> {
  data: ProductTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   *
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ProductTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(map(() => this.getPagedData(this.getSortedData([...this.data]))));
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
  private getPagedData(data: ProductTableItem[]): ProductTableItem[] {
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
  private getSortedData(data: ProductTableItem[]): ProductTableItem[] {
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
  private compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
