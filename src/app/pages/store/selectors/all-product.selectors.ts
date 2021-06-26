import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AllProductReducer } from '../reducers';

export const selectAllProductState =
  createFeatureSelector<AllProductReducer.State>(
    AllProductReducer.allProductFeatureKey
  );

export const selectAllProducts = createSelector(
  selectAllProductState,
  AllProductReducer.selectAll
);
