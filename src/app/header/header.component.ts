import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth-service';
import * as fromApp from '../store/app.reducer';
import * as authActions from '../auth/store/auth.actions';
import { map } from 'rxjs/operators';
import { DataStorageService } from '../shared/data-storage.service';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
      this.userSub = this.store.select('auth').pipe(
        map(authState => authState.user)
      ).subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  // @Output() navselection = new EventEmitter<string>();

  // OnRecipesClicked() {
  //   this.navselection.emit('recipes');
  // }

  // OnShoppingListClicked() {
  //   this.navselection.emit('shopping_list');
  // }

  onLogout() {
    // this.authService.logout();    
    this.store.dispatch(new authActions.Logout());
  }
  onSaveData() {
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipesActions.StoreRecipes())
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }
}