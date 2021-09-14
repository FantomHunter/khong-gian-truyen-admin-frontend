import { CategoryItem } from 'src/app/core/model/category-item.model';
import { createAction, props } from '@ngrx/store';

export const loadUpdateCategory = createAction(
  '[UpdateCategory] Load UpdateCategory',
  props<{ category: CategoryItem }>()
);

export const loadUpdateCategorySuccess = createAction(
  '[UpdateCategory] Load UpdateCategory Success',
  props<{ category: CategoryItem }>()
);

export const loadUpdateCategoryFailure = createAction(
  '[UpdateCategory] Load UpdateCategory Failure',
  props<{ error: any }>()
);
