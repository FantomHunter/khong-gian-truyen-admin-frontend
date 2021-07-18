import { createAction, props } from '@ngrx/store';
import { CategoryItem } from 'src/app/core/model/category-item.model';

export const loadAllCategories = createAction(
  '[AllCategory] Load AllCategories'
);

export const loadAllCategoriesSuccess = createAction(
  '[AllCategory] Load AllCategories Success',
  props<{ categories: CategoryItem[] }>()
);

export const loadAllCategoriesFailure = createAction(
  '[AllCategory] Load AllCategories Failure',
  props<{ error: any }>()
);
