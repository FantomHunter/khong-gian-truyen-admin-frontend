import { createAction, props } from '@ngrx/store';

export const loadDeleteProducts = createAction(
  '[DeleteProduct] Load DeleteProducts',
  props<{ id: number }>()
);

export const loadDeleteProductsSuccess = createAction(
  '[DeleteProduct] Load DeleteProducts Success'
);

export const loadDeleteProductsFailure = createAction(
  '[DeleteProduct] Load DeleteProducts Failure',
  props<{ error: any }>()
);
