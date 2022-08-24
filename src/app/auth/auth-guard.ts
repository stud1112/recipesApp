import { LiteralArray } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, exhaustMap, Observable, Subject } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AuthService } from './auth-service';
import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // return this.authService.user.pipe(take(1), exhaustMap(user => {
    //     let allowRoute = new BehaviorSubject<boolean>(false);
    //     if (!user) {
    //         return allowRoute;
    //     }
    //     allowRoute.next(true);
    //     return allowRoute;
    // }));
    return this.store.select('auth')
      .pipe
      (
        take(1),
        map(authState => authState.user),
        map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['./auth']);
      })
    );
  }
}
