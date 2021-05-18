import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ProductItem } from 'src/app/core/model/product-item.model';
import { AllProductAction } from '../actions';

export const allProductFeatureKey = 'allProduct';

export interface State extends EntityState<ProductItem> {
  // additional entities state properties
  selectedUserId: number | null;
}

export const adapter: EntityAdapter<ProductItem> =
  createEntityAdapter<ProductItem>({
    selectId: (product: ProductItem) => product.id,
  });

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedUserId: null,
});

export const reducer = createReducer(
  initialState,
  on(AllProductAction.loadAllProductsSuccess, (state, { products }) =>
    adapter.setAll(products, state)
  )
);
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
