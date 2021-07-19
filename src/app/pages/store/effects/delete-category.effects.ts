import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { CategoryServiceApi } from 'src/app/core/service/category-service.api';
import { AllCategoryAction, DeleteCategoryAction } from '../actions';

@Injectable()
export class DeleteCategoryEffects {
  deleteCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeleteCategoryAction.loadDeleteCategorys),
      concatMap(({ id }) =>
        this.categoryServiceApi.deleteCategory(id).pipe(
          map((result) => AllCategoryAction.loadAllCategories()),
          catchError((error) =>
            of(DeleteCategoryAction.loadDeleteCategorysFailure({ error }))
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
