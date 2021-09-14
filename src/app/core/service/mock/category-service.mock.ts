import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CategoryItem } from '../../model/category-item.model';
import { CategoryServiceApi } from '../category-service.api';

@Injectable({ providedIn: 'root' })
export class CategoryServiceMock extends CategoryServiceApi {
  EXAMPLE_DATA: CategoryItem[] = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Fantasy' },
  ];

  getAllCategory(): Observable<CategoryItem[]> {
    return of(this.EXAMPLE_DATA).pipe(delay(1000));
  }

  createCategory(category: CategoryItem): Observable<CategoryItem> {
    this.EXAMPLE_DATA = this.EXAMPLE_DATA.concat({
      ...category,
      id: this.EXAMPLE_DATA[this.EXAMPLE_DATA.length - 1].id + 1,
    });
    return of(this.EXAMPLE_DATA[this.EXAMPLE_DATA.length - 1]).pipe(
      delay(2000)
    );
  }

  deleteCategory(id: number): Observable<boolean> {
    this.EXAMPLE_DATA = this.EXAMPLE_DATA.filter(
      (product) => product.id !== id
    );
    return of(true);
  }

  updateCategory(category: CategoryItem): Observable<CategoryItem> {
    const indexFound = this.EXAMPLE_DATA.findIndex((e) => e.id === category.id);
    if (indexFound === -1) {
      return throwError('Category not found');
    }

    this.EXAMPLE_DATA = this.EXAMPLE_DATA.slice();
    this.EXAMPLE_DATA.splice(indexFound, 1, category);
    console.log('update event: ', this.EXAMPLE_DATA.slice());
    return of(category).pipe(delay(2000));
  }
}
