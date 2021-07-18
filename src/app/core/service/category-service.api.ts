import { Observable } from "rxjs";
import { CategoryItem } from "../model/category-item.model";

export abstract class CategoryServiceApi {
  abstract getAllCategory(): Observable<CategoryItem[]>;
}
