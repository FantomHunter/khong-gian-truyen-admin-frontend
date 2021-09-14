import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { CategoryServiceApi } from 'src/app/core/service/category-service.api';
import { AllCategoryAction, UpdateCategoryAction } from '../actions';

@Injectable()
export class UpdateCategoryEffects {
  updateCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpdateCategoryAction.loadUpdateCategory),
      concatMap(({ category }) =>
        this.categoryServiceApi.updateCategory(category).pipe(
          map((category) =>
            UpdateCategoryAction.loadUpdateCategorySuccess({ category })
          ),
          catchError((error) =>
            of(UpdateCategoryAction.loadUpdateCategoryFailure({ error }))
          )
        )
      )
    );
  });

  updateCategorySuccessful$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateCategoryAction.loadUpdateCategorySuccess),
      concatMap(() => {
        return of(AllCategoryAction.loadAllCategories());
      })
    )
  );

  constructor(
    private actions$: Actions,
    private categoryServiceApi: CategoryServiceApi
  ) {}
}
