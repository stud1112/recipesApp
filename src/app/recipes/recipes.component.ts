import { Component } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';
// import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  // recipeSelected: Recipe;
  
  constructor(private recipeService: RecipeService) {
    // this.recipeService.changedRecipe.subscribe(
    //   (recipe: Recipe) => this.recipeSelected = recipe
    // );
  }
}
