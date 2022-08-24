import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import { RecipeService } from 'src/app/shared/recipe.service';
import { StartEdit } from 'src/app/shopping-list/store/shopping-list.actions';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>) { }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnInit(): void {
    // this.id = +this.route.snapshot.paramMap.get('id');
    // this.editMode = this.id  != null;
    // this.initForm();


      // this.route.params.subscribe(
      // (params: Params) => {
      //   this.id = +params['id'];
      //   this.editMode = params['id'] != null;
      //   this.initForm();
      // }
      // );
    this.route.params.pipe(
      switchMap((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        return this.store.select(state => state.recipes.recipes[+params['id']]);
      })
    ).subscribe((recipe: Recipe) => {
      this.initForm(recipe);
    }
    );
    
    
    // console.log('RecipeEditComponent : ngOnInit');
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route}); 
  }

  onRemoveIngredient(index: number) {
    // console.log((<FormArray>this.recipeForm.get("ingredients")).controls);  
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);    
  }

  private initForm(recipe: Recipe) {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)]),
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
