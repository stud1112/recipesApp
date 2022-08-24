import { Component /* , Input */, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from 'src/app/shared/recipe.service';
import { AddIngredients } from 'src/app/shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  /* @Input()  */ recipe: Recipe;
  recipeId: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => {
    //   this.recipeId = +params['id'];
    //   this.recipe = this.recipeService.getRecipes()[this.recipeId];      
    // });
    this.route.params.pipe(
      switchMap((params: Params) => {
        this.recipeId = +params['id'];
        return this.store.select(state => state.recipes.recipes[+params['id']]);
      })
    ).subscribe(recipe => {
      this.recipe = recipe;
    });

    // console.log('RecipeDetailComponent : ngOnInit');
  }

  ToShoppingList() {
    // this.recipeService.addRecipeToShopList(this.recipe);
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(['/recipes']);
  }
}
