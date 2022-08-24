import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth-service';
import * as AuthActions from './auth/store/auth.actions';
import * as fromApp from './store/app.reducer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'RecipesApp';
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) { }
  // recipesSelected: boolean = true;

  // alterviews() {
  //   this.recipesSelected = !this.recipesSelected;
  // }

  // onNavSelection(navselection: string) {
  //   switch (navselection) {
  //     case 'recipes': this.recipesSelected = true; break;
  //     case 'shopping_list': this.recipesSelected = false; break;
  //     default: this.recipesSelected = true;
  //   }
  // }
  ngOnInit(): void {
    // this.authService.autoLogin();
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}