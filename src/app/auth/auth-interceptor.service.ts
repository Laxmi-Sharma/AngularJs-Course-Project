import {Injectable} from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor( private store:Store<fromRoot.AppState>){}

    intercept(request:HttpRequest<any>, next: HttpHandler){
        return  this.store.select('auth').pipe(
            take(1),
            map(authState=>{
                return authState.user;
            }),
            exhaustMap(user =>{
            if(!user){
                return next.handle(request);
            }
            const modifiedRequest  = request.clone({params:new HttpParams().set('auth',user.token)
            });
            return next.handle(modifiedRequest);
        }));   
    }
}