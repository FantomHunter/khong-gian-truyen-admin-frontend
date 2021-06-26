import { createAction, props } from '@ngrx/store';
import { ProductItem } from 'src/app/core/model/product-item.model';

export const createProducts = createAction(
  '[CreateProduct] CreateProducts',
  props<{ product: ProductItem }>()
);

export const createProductsSuccess = createAction(
  '[CreateProduct] CreateProducts Success',
  props<{ product: ProductItem }>()
);

export const createProductsFailure = createAction(
  '[CreateProduct] CreateProducts Failure',
  props<{ error: any }>()
);
