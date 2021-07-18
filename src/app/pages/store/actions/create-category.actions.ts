import { createAction, props } from '@ngrx/store';
import { CategoryItem } from 'src/app/core/model/category-item.model';

export const loadCreateCategory = createAction(
  '[CreateCategory] Load CreateCategory',
  props<{ category: CategoryItem}>()
);

export const loadCreateCategorySuccess = createAction(
  '[CreateCategory] Load CreateCategory Success',
  props<{ category: CategoryItem }>()
);

export const loadCreateCategoryFailure = createAction(
  '[CreateCategory] Load CreateCategory Failure',
  props<{ error: any }>()
);
