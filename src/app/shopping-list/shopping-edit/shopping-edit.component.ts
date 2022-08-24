import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', {static: true}) name: ElementRef;
  // @ViewChild('amountInput', { static: true }) amount: ElementRef;
  subscription: Subscription;
  editMode = false;
  // editedItemIndex: number;
  editedItem: Ingredient;

  @ViewChild('f', {static: false}) myForm: NgForm;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(sl => {
      if (sl.editedIngredientIndex >= 0) {
        this.editMode = true;
        // this.editedItemIndex = sl.editedIngredientIndex;
        this.editedItem = sl.editedIngredient;
        this.myForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });    
  }

  ngOnDestroy(): void {
    this. subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  // onIngredientAdd() {
  //   this.slService.addIngredient(new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value));
  // }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (!this.editMode) {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    } else {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient( newIngredient ));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.myForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    if (this.editMode) {
      // this.slService.deleteIngredient(this.editedItemIndex);
      this.store.dispatch(new ShoppingListActions.DeleteIngredient());  
      this.onClear();
    }
  }

}
