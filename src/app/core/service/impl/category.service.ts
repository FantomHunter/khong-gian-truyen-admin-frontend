import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryServiceApi } from 'src/app/core/service/category-service.api';
import { CategoryItem } from '../../model/category-item.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService implements CategoryServiceApi {
  constructor(private httpClient: HttpClient) {}
  getAllCategory(): Observable<CategoryItem[]> {
    return this.httpClient
      .get<any>(environment.backendUrl + '/category')
      .pipe(map((response) => response.categories));
  }
  createCategory(category: CategoryItem): Observable<CategoryItem> {
    const body = { name: category.name };
    return this.httpClient
      .post<any>(environment.backendUrl + '/category', body)
      .pipe(map((response) => response.newCategory));
  }
  deleteCategory(id: number): Observable<boolean> {
    return this.httpClient
      .delete(environment.backendUrl + '/category/' + id)
      .pipe(map((res) => true));
  }
  updateCategory(category: CategoryItem): Observable<CategoryItem> {
    return this.httpClient
      .put<any>(environment.backendUrl + '/category', {category})
      .pipe(map((response) => response.category));
  }
}
