import { createAction, props } from '@ngrx/store';

export const createProducts = createAction(
  '[CreateProduct] Load CreateProducts'
);

export const createProductsSuccess = createAction(
  '[CreateProduct] Load CreateProducts Success',
  props<{ data: any }>()
);

export const createProductsFailure = createAction(
  '[CreateProduct] Load CreateProducts Failure',
  props<{ error: any }>()
);
