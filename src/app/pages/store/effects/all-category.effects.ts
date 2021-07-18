import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { CategoryServiceApi } from 'src/app/core/service/category-service.api';
import { AllCategoryAction } from '../actions';

@Injectable()
export class AllCategoryEffects {
  loadAllCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AllCategoryAction.loadAllCategories),
      concatMap(() =>
        this.categoryServiceApi.getAllCategory().pipe(
          map((categories) =>
            AllCategoryAction.loadAllCategoriesSuccess({ categories })
          ),
          catchError((error) =>
            of(AllCategoryAction.loadAllCategoriesFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private categoryServiceApi: CategoryServiceApi
  ) {}
}
