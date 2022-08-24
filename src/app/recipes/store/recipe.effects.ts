import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

@Injectable()
export class RecipeEffects {
  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          `https://ng-course-recipe-book-8e08a-default-rtdb.firebaseio.com/recipes.json`
        ).pipe(
            map((recipes) => {
                return new RecipeActions.SetRecipes(recipes);
            })
        )
      })
    )
    );
    
  constructor(private actions$: Actions, private http: HttpClient) {}
}
