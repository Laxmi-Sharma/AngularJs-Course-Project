import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromRoot from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({providedIn : 'root'})
export class AuthGuardService implements CanActivate{
     
    constructor(private store:Store<fromRoot.AppState>, private router:Router){}

    canActivate(route : ActivatedRouteSnapshot, routerState : RouterStateSnapshot)
    : boolean | UrlTree | Promise<boolean> | Observable<boolean | UrlTree>{
        ////so we don't have ongoing subscription
        return this.store.select('auth').pipe(
            take(1), 
            map(authState=>{
                return authState.user;
            }),
            map(user =>{
            const isAuth= !!user;
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(['./auth']);
        }));
    }
}