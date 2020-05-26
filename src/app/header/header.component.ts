import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromRoot from '../store/app.reducer';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'aap-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    userSub: Subscription;
    constructor(
        private authService:AuthService,
        private dataStorageService: DataStorageService,
         private store:Store<fromRoot.AppState>) { }

    ngOnInit() {
        this.userSub = this.store.select('auth')
        .pipe(map(authState=>{
            return authState.user;
        }))
        .subscribe(user => {
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        });

    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    onDataSave() {
        // this.dataStorageService.storeRecipies();
        this.store.dispatch(new RecipeActions.StoreRecipies());
    }

    onFetchData() {
        //this.dataStorageService.fetchRecipies().subscribe();
        this.store.dispatch(new RecipeActions.FetchRecipies());
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }
}