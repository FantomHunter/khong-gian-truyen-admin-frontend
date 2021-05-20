import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ProductServiceApi } from 'src/app/core/service/product-service.api';
import { CreateProductAction } from '../actions';



@Injectable()
export class CreateProductEffects {
  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CreateProductAction.createProducts),
      concatMap(({product}) =>
        this.productServiceApi.createProduct(product).pipe(
          map((product) =>
            CreateProductAction.createProductsSuccess({ product })
          ),
          catchError((error) =>
            of(CreateProductAction.createProductsFailure({ error }))
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
