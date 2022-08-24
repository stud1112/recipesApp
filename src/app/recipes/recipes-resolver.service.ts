import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import * as fromApp from '../store/app.reducer';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
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
      this.store.dispatch(new RecipesActions.FetchRecipes());
      return this.actions$.pipe(
          ofType(RecipesActions.SET_RECIPES),
          take(1)
      );
  }
}
