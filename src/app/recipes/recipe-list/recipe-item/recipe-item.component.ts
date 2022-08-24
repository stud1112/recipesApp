import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  // recipeId: number = 0;
  
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    
  }

  onRecipeSelected() {
    // this.recipeService.changedRecipe.emit(this.recipe);  
  }
}
