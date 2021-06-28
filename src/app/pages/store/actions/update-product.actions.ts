import { createAction, props } from '@ngrx/store';
import { ProductItem } from 'src/app/core/model/product-item.model';

export const loadUpdateProducts = createAction(
  '[UpdateProduct] Load UpdateProducts',
  props<{ product: ProductItem }>()
);

export const loadUpdateProductsSuccess = createAction(
  '[UpdateProduct] Load UpdateProducts Success',
  props<{ product: ProductItem }>()
);

export const loadUpdateProductsFailure = createAction(
  '[UpdateProduct] Load UpdateProducts Failure',
  props<{ error: any }>()
);
