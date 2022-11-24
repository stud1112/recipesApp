import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import * as fromApp from '../store/app.reducer';
import { Observable, of } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { Recipe } from './recipe.model';

import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as RecipesActions from './store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    // const recipes = <Recipe[]>this.recipeService.getRecipes();
    // return recipes.length > 0 ? recipes : this.dataStorageService.fetchRecipes();
    return this.store
      .select((state) => state.recipes.recipes)
      .pipe(
        take(1),
        switchMap((recipes: Recipe[]) => {
          if (recipes.length === 0) {
            this.store.dispatch(new RecipesActions.FetchRecipes());
            return this.actions$.pipe(
              ofType(RecipesActions.SET_RECIPES),
              take(1)
            );
          } else {
            return of(recipes);
          }
        })
      );
  }
}
