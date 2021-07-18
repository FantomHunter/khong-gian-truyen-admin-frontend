import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CategoryItem } from 'src/app/core/model/category-item.model';
import { AllCategoryAction } from '../actions';

export const allCategoryFeatureKey = 'allCategory';

export interface State extends EntityState<CategoryItem> {}

export const adapter: EntityAdapter<CategoryItem> =
  createEntityAdapter<CategoryItem>({
    selectId: (category: CategoryItem) => category.id,
  });

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(AllCategoryAction.loadAllCategoriesSuccess, (state, { categories }) =>
    adapter.setAll(categories, state)
  )
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
