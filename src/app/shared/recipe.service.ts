import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Recipe, RecipeRO } from "../recipes/recipe.model";
import { Ingredient } from "./ingredient.model";

@Injectable({providedIn: 'root'})
export class RecipeService {
  private recipes: Recipe[] = [];/*  = [
        new Recipe(
          'Tasty Schnitzel',
          'A super-tasty Schnitzel - just awesome!',
          'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
          [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
          ]),
        new Recipe('Big Fat Burger',
          'What else you need to say?',
          'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
          [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
          ]) 
      ];*/
    private recipes_ro : ReadonlyArray<RecipeRO> = this.recipes;
    // changedRecipe = new EventEmitter<Recipe>();

    constructor() { }
  
    setRecipes(recipes: Recipe[]) {
      this.recipes.splice(0, this.recipes.length, ...recipes);
    }
  
    getRecipes() {
      return this.recipes_ro;
    }
    
    getRecipe(id: number) {
      return this.recipes[id];  
    }
  
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
    }

    updateRecipe(index: number, recipe: Recipe) {
      this.recipes[index] = recipe;
    }
  

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
    }

}