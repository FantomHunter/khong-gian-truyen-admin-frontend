import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
}
