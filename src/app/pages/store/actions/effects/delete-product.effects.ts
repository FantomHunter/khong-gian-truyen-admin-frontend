import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ProductServiceApi } from 'src/app/core/service/product-service.api';
import { AllProductAction, DeleteProductAction } from '../actions';



@Injectable()
export class DeleteProductEffects {
  deleteProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeleteProductAction.loadDeleteProducts),
      concatMap(({id}) =>
        this.productServiceApi.deleteProduct(id).pipe(
          map((result) =>
            // DeleteProductAction.loadDeleteProductsSuccess()
            AllProductAction.loadAllProducts()
          ),
          catchError((error) =>
            of(DeleteProductAction.loadDeleteProductsFailure({ error }))
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
