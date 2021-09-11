import { HttpClient } from '@angular/common/http';
import { ElementSchemaRegistry } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductItem } from '../../model/product-item.model';
import { ProductStatus } from '../../model/product-status.enum';
import { ProductType } from '../../model/product-type.enum';
import { ProductServiceApi } from '../product-service.api';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ProductServiceApi {
  createProduct(product: ProductItem): Observable<ProductItem> {
    const body = {
      description: 'product create from admin page',
      imageUrl: product.imageUrl,
      name: product.name,
      publishDate: product.publishDate,
      status: ProductStatus[product.status],
      totalChapter: product.totalChapter,
      type: ProductType[product.type],
    };
    return this.httpClient
      .post<any>(
        environment.backendUrl + '/product',
        body
      )
      .pipe(map((response) => this.convert(response.product)));
  }
  getAllProduct(): Observable<ProductItem[]> {
    return this.httpClient
      .get<{ productList: any[] }>(
        environment.backendUrl + '/product?page=0&size=500&order=BY_ID'
      )
      .pipe(
        map((response) => {
          const products: ProductItem[] = [];
          response.productList.forEach((element) => {
            products.push(this.convert(element));
          });
          return products;
        })
      );
  }
  deleteProduct(id: number): Observable<boolean> {
    return this.httpClient
      .delete(environment.backendUrl + '/product/' + id)
      .pipe(map((response) => true));
  }

  convert(element: any): ProductItem {
    return {
      id: element.id,
      imageUrl: element.imageUrl,
      name: element.name,
      publishDate: element.publishDate,
      status:
        ProductStatus[element.status.toString() as keyof typeof ProductStatus],
      type: ProductType[element.type.toString() as keyof typeof ProductType],
      totalChapter: element.totalChapter,
    };
  }

  updateProduct(product: ProductItem): Observable<ProductItem> {
    const body = {
      product: {
        id: product.id,
        description: 'product create from admin page',
        imageUrl: product.imageUrl,
        name: product.name,
        publishDate: product.publishDate,
        status: ProductStatus[product.status],
        totalChapter: product.totalChapter,
        type: ProductType[product.type],
      },
    };
    return this.httpClient
      .put<any>(
        environment.backendUrl + '/product/',
        body
      )
      .pipe(map((response) => this.convert(response.product)));
  }

  constructor(private httpClient: HttpClient) {
    super();
  }
}
