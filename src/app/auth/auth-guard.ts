import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({providedIn : 'root'})
export class AuthGuardService implements CanActivate{
     
    constructor(private authService: AuthService,private router:Router){}

    canActivate(route : ActivatedRouteSnapshot, routerState : RouterStateSnapshot)
    : boolean | UrlTree | Promise<boolean> | Observable<boolean | UrlTree>{
        return this.authService.user.pipe(
            take(1),//so we don't have ongoing subscription
            map(user =>{
            const isAuth= !!user;
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(['./auth']);
        }));
    }
}