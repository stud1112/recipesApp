import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe, RecipeRO } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { StartEdit } from 'src/app/shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnChanges {
  // recipes: ReadonlyArray<RecipeRO>;
  recipes$: Observable<Recipe[]>;
  // recipes = [];

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    // this.recipes = this.recipeService.getRecipes();
    this.recipes$ = this.store.select(state => state.recipes.recipes);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    // this.recipes = this.recipeService.getRecipes();
  }

  onAddRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
    // this.recipeService.addRecipe(new Recipe('Cibo Carne Ricetta - 2', 'This is simply a test - 2', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg', [new Ingredient('Apples', 10)]))