import { createAction, props } from '@ngrx/store';

export const loadDeleteCategorys = createAction(
  '[DeleteCategory] Load DeleteCategory',
  props<{id: number}>()
);

export const loadDeleteCategorysSuccess = createAction(
  '[DeleteCategory] Load DeleteCategory Success'
);

export const loadDeleteCategorysFailure = createAction(
  '[DeleteCategory] Load DeleteCategory Failure',
  props<{ error: any }>()
);
