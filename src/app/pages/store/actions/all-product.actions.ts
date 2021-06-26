import { ProductItem } from 'src/app/core/model/product-item.model';
import { createAction, props } from '@ngrx/store';

export const loadAllProducts = createAction(
  '[AllProduct] Load AllProducts'
);

export const loadAllProductsSuccess = createAction(
  '[AllProduct] Load AllProducts Success',
  props<{ products: ProductItem[] }>()
);

export const loadAllProductsFailure = createAction(
  '[AllProduct] Load AllProducts Failure',
  props<{ error: any }>()
);
