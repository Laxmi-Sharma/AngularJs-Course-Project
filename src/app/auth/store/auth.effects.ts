import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { AuthResponseData, AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';

@Injectable()
export class AuthEffects {
    API_KEY = environment.firebaseApiKey;
    authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.API_KEY;
    signInUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.API_KEY;

     handleAuthentication (
        expiresIn: number,
        email: string,
        localId: string,
        idToken: string
    ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user: User = new User(email, localId, idToken, expirationDate);
        localStorage.setItem('userData', JSON.stringify(user));
        return new AuthActions.AuthenticateSuccess({
            email: email,
            userId: localId,
            token: idToken,
            expirationDate: expirationDate
        });
    };

     handleError(errorRes: any){
        let errorMessage = "Error Occured ! ";
        if (!errorRes.error || !errorRes.error.error) {
            return of(new AuthActions.AuthenticateFail(errorMessage));
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "This Email already exists !";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = " Email not found !";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "Password invalid !";
                break;
            case 'USER_DISABLED':
                errorMessage = " User Disabled ! ";
                break;
        }
        return of(new AuthActions.AuthenticateFail(errorMessage));
    };

    @Effect()
    autoLogin = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN), map(() => {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return {type:'DUMMY'};
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
            //this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.authService.setLogoutTimer(expirationDuration); 
            return new AuthActions.AuthenticateSuccess(
                {
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._tokenExpirationDate)
                })
            // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            // this.autoLogout(expirationDuration);
        }
        return {type:'DUMMY'}
    })
    )

    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), tap(() => {
        this.authService.clearLogoutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
    }))

    @Effect()
    authLogin = this.actions$.pipe(ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(this.signInUrl, {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            })
                .pipe(
                    tap(resData=>{
                        this.authService.setLogoutTimer(+resData.expiresIn *1000);
                    }),
                    map(resData => {
                        return this.handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
                    }),
                    catchError(errorRes => {
                        return this.handleError(errorRes);
                    })
                );
        })
    );

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS), tap(
        () => {
            this.router.navigate(['/']);
        }
    ));

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>(this.authUrl, {
                email: signupAction.payload.email,
                password: signupAction.payload.password,
                returnSecureToken: true
            }).pipe(
                tap(resData=>{
                    this.authService.setLogoutTimer(+resData.expiresIn *1000);
                }),
                map(resData => {
                    return this.handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
                }),
                catchError(errorRes => {
                    return this.handleError(errorRes);
                })
            );
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private router: Router,
    private authService:AuthService) { }

}