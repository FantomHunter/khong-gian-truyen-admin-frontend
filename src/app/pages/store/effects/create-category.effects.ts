import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { CategoryServiceApi } from 'src/app/core/service/category-service.api';
import { CreateCategoryAction } from '../actions';

@Injectable()
export class CreateCategoryEffects {
  createCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CreateCategoryAction.loadCreateCategory),
      concatMap(({ category }) =>
        this.categoryServiceApi.createCategory(category).pipe(
          map((category) =>
            CreateCategoryAction.loadCreateCategorySuccess({ category })
          ),
          catchError((error) =>
            of(CreateCategoryAction.loadCreateCategoryFailure({ error }))
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
