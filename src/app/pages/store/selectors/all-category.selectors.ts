import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AllCategoryReducer } from '../reducers';

export const selectAllCategoryState =
  createFeatureSelector<AllCategoryReducer.State>(
    AllCategoryReducer.allCategoryFeatureKey
  );

export const selectAllCategory = createSelector(
  selectAllCategoryState,
  AllCategoryReducer.selectAll
);
