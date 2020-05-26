import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private store: Store<fromRoot.AppState>,
        private actions: Actions,
        private recipeService: RecipeService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        return this.store.select('recipies').pipe(
            take(1),
            map(recipeState => {
                return recipeState.recipies;
            }),
            switchMap(recipies => {
                if (recipies.length === 0) {
                    this.store.dispatch(new RecipeActions.FetchRecipies());
                    return this.actions.pipe(ofType(RecipeActions.SET_RECIPIES),
                        take(1));
                } else {
                    return of(recipies);
                }
            })
        );


        // const recipies = this.recipeService.getRecipes();
        // if(recipies.length===0){
        //     return this.dataStorageService.fetchRecipies();
        // }else{
        //     return recipies;
        // }

    }
}