import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ProductServiceApi } from 'src/app/core/service/product-service.api';
import { AllProductAction, UpdateProductAction } from '../actions';

@Injectable()
export class UpdateProductEffects {
  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpdateProductAction.loadUpdateProducts),
      concatMap(({ product }) =>
        this.productServiceApi.updateProduct(product).pipe(
          map((product) =>
            UpdateProductAction.loadUpdateProductsSuccess({ product })
          ),
          catchError((error) =>
            of(UpdateProductAction.loadUpdateProductsFailure({ error }))
          )
        )
      )
    );
  });

  updateProductSuccessful$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateProductAction.loadUpdateProductsSuccess),
      concatMap(() => {
        return of(AllProductAction.loadAllProducts());
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productServiceApi: ProductServiceApi
  ) {}
}
