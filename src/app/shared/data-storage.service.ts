import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import {map, tap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import * as fromRoot from '../store/app.reducer';
import * as RecipiesActions from '../recipes/store/recipe.actions';
import { Store } from '@ngrx/store';

@Injectable({providedIn : 'root'})
export class DataStorageService{
    constructor(private http : HttpClient, private recipeService : RecipeService,
        private store:Store<fromRoot.AppState>){
    }

    firebaseDBUrl = "https://ng-course-recipe-book-c2cf1.firebaseio.com/recipies.json";
    storeRecipies(){
        const recipies = this.recipeService.getRecipes();
        return this.http.put<Recipe>(this.firebaseDBUrl,recipies).subscribe(response =>{
            console.log(response);
        });
    }

    fetchRecipies(){
        return this.http.get<Recipe[]>(this.firebaseDBUrl
            ).pipe(
        map(recipies =>{
        return recipies.map(recipe =>{
            return {...recipe, ingredients : recipe.ingredients ? recipe.ingredients : []};
        });
    }), tap(recipies =>{
        // this.recipeService.setRecipies(recipies);
        this.store.dispatch(new RecipiesActions.SetRecipies(recipies));
    }));
    }
}