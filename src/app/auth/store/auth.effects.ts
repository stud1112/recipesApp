import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';
import { User } from '../user.model';
import { trigger } from '@angular/animations';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.Login({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true
  });
};

const handleError = (errorRes: HttpErrorResponse) => {
  let errMsg = 'An uknown error occured';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.LoginFail(errMsg));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errMsg = 'This email already exists!';
      break;
    case 'EMAIL_NOT_FOUND':
      errMsg = 'No user found with this email!';
      break;
    case 'INVALID_PASSWORD':
      errMsg = 'The password inserted is incorrect';
  }
  return of(new AuthActions.LoginFail(errMsg));
};

@Injectable()
export class AuthEffects {
  authSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((authData: AuthActions.SignupStart) => {
        return this.http
          .post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authS.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError((errorRes: HttpErrorResponse) => handleError(errorRes))
          );
      })
    )
  );
  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authS.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) =>
              handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              )
            ),
            catchError((errorRes: HttpErrorResponse) => handleError(errorRes))
          );
      })
    )
  );
  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap((authLogin: AuthActions.Login) => {
          if (authLogin.payload.redirect) {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  autoLogin = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
          const userData = JSON.parse(localStorage.getItem('userData'));
          if (!userData) {
            return { type: 'DUMMY' };
          }
          const loadedUser = new User(
                          userData.email,
                          userData.id,
                          userData._token,
                          new Date(userData._tokenExpirationDate)
          );
          if (loadedUser.token) {
            const expirationDuration = loadedUser.tokenExpirationDate.getTime() - new Date().getTime();
            this.authS.setLogoutTimer(+expirationDuration);
            return new AuthActions.Login({
              email: loadedUser.email,
              userId: loadedUser.id,
              token: loadedUser.token,
              expirationDate: new Date(userData._tokenExpirationDate),
              redirect: false
            });
          }
          return { type: 'DUMMY' };
        })
      )
  );
  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.authS.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authS: AuthService
  ) {}
}
