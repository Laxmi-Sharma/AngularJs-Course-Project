import { Actions, ofType, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as RecipeActions from './recipe.actions';
import * as fromRoot from '../../store/app.reducer';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
    firebaseDBUrl = "https://ng-course-recipe-book-c2cf1.firebaseio.com/recipies.json";

    constructor(private actions: Actions, 
        private store:Store<fromRoot.AppState>,
        private http: HttpClient) { }

    @Effect({dispatch:false})
    storeRecipies = this.actions.pipe(ofType(RecipeActions.STORE_RECIPIES)
        ,withLatestFrom(this.store.select('recipies'))
        , switchMap(( [actionData, recipeState]) => {
            return this.http.put<Recipe>(this.firebaseDBUrl, recipeState.recipies);
        }))

    @Effect()
    fetchRecipies = this.actions.pipe(ofType(RecipeActions.FETCH_RECIPIES), switchMap(() => {
        return this.http.get<Recipe[]>(this.firebaseDBUrl
        )
    }), map(recipies => {
        return recipies.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
    }), map(recipies => {
        return new RecipeActions.SetRecipies(recipies);
    })
    );
}