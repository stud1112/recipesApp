import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

import { Store } from "@ngrx/store";

// export interface AuthResponseData {
//     kind: string;
//     idToken: string;
//     email: string;
//     refreshToken: string;
//     expiresIn: string;
//     localId: string;
//     registered?: boolean;
// }

@Injectable({providedIn: 'root'})
export class AuthService {
    // user = new BehaviorSubject<User>(null);
    tokenExpirationTimer = null;

    constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) { }
    
    // singup(email: string, password: string) : Observable<AuthResponseData>{
    //     return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
    //         {
    //             email: email,
    //             password: password,
    //             returnSecureToken: true
    //         }
    //     ).pipe(
    //         catchError(this.handleError),
    //         tap(userData => {
    //             this.handleAuthentication(userData.email, userData.localId, userData.idToken, userData.expiresIn);
    //         })
    //     );
    // }

    // login(email: string, password: string) {
    //     return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
    //         {
    //             email: email,
    //             password: password,
    //             returnSecureToken: true
    //         }
    //     ).pipe(
    //         catchError(this.handleError),
    //         tap(userData => {
    //             this.handleAuthentication(userData.email, userData.localId, userData.idToken, userData.expiresIn);
    //         }));
    // }

    // autoLogin() {
    //     const userData = JSON.parse(localStorage.getItem('userData'));
    //     if (userData) {
    //         const loadedUser = new User(
    //             userData.email,
    //             userData.id,
    //             userData._token,
    //             new Date(userData._tokenExpirationDate)
    //         );
    //         if (loadedUser.token) {
    //             // this.user.next(loadedUser);
    //             this.store.dispatch(new authActions.Login({
    //                 email: loadedUser.email,
    //                 userId: loadedUser.id,
    //                 token: loadedUser.token,
    //                 expirationDate: new Date(userData._tokenExpirationDate)
    //             }));
    //             const logoutInterval = loadedUser.tokenExpirationDate.getTime() - new Date().getTime();
    //             console.log(logoutInterval);
    //             this.autoLogout(logoutInterval);
    //         }            
    //     }
    // }

    // logout() {
    //     // this.user.next(null);
    //     this.store.dispatch(new authActions.Logout());
    //     localStorage.removeItem('userData');
    //     if (this.loginTimeout) {
    //         clearTimeout(this.loginTimeout);
    //     }
    //     this.loginTimeout = null;
    // }

    setLogoutTimer(loginExpirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
        }, loginExpirationDuration);
    }

    clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }        
    }

    // private handleAuthentication(email: string, id: string, token: string, expiresIn: string) {
    //     const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    //     const user: User = new User(email, id, token, expirationDate);
    //     // this.user.next(user);
    //     this.store.dispatch(new authActions.Login({ email: email, userId: id, token: token, expirationDate: expirationDate }));
    //     localStorage.setItem('userData', JSON.stringify(user));
    //     this.autoLogout(+expiresIn * 1000);
    // }

    // private handleError(errorRes: HttpErrorResponse) {
    //     let errMsg = 'An uknown error occured';
    //     if (!errorRes.error || !errorRes.error.error) {
    //         return throwError(() => new Error(errMsg));
    //     }
    //     switch (errorRes.error.error.message) {
    //         case 'EMAIL_EXISTS': errMsg = 'This email already exists!'; break;
    //         case 'EMAIL_NOT_FOUND': errMsg = 'No user found with this email!'; break;
    //         case 'INVALID_PASSWORD': errMsg = 'The password inserted is incorrect';
    //     }
    //     return throwError(() => new Error(errMsg));
    // }
}