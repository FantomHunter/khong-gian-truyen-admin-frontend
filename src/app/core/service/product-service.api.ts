import { ProductItem } from './../model/product-item.model';
import { Observable } from 'rxjs';
export abstract class ProductServiceApi {
  abstract createProduct(product: ProductItem): Observable<ProductItem>;
  abstract getAllProduct(): Observable<ProductItem[]>;
  abstract deleteProduct(id: number): Observable<boolean>;
}
