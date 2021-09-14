import { Observable } from 'rxjs';
import { CategoryItem } from '../model/category-item.model';

export abstract class CategoryServiceApi {
  abstract getAllCategory(): Observable<CategoryItem[]>;
  abstract createCategory(category: CategoryItem): Observable<CategoryItem>;
  abstract deleteCategory(id: number): Observable<boolean>;
  abstract updateCategory(category: CategoryItem): Observable<CategoryItem>;
}
