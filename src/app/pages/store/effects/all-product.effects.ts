import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ProductServiceApi } from 'src/app/core/service/product-service.api';
import { AllProductAction } from '../actions';

@Injectable()
export class AllProductEffects {
  loadAllProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AllProductAction.loadAllProducts),
      concatMap(() =>
        this.productServiceApi.getAllProduct().pipe(
          map((products) =>
            AllProductAction.loadAllProductsSuccess({ products })
          ),
          catchError((error) =>
            of(AllProductAction.loadAllProductsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private productServiceApi: ProductServiceApi
  ) {}
}
