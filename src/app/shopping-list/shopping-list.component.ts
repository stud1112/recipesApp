import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient, IngredientRO } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ingredients: Ingredient[]} >;

  constructor(private store: Store<fromApp.AppState>)
  { }
  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppinglistService.getIngredients();
  }

  addNewIngr(ingr: IngredientRO) {
    // this.shoppinglistService.addIngredient(ingr);
    this.store.dispatch(new ShoppingListActions.AddIngredient(ingr));
  }

  onLoadItem(id: number) {
    // this.shoppinglistService.startedEditing.next(id);
    this.store.dispatch(new ShoppingListActions.StartEdit(id));
  }

}
