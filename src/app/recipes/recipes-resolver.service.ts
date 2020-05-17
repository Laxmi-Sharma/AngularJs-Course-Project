import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
constructor(private dataStorageService:DataStorageService, private recipeService: RecipeService){}

resolve(route : ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const recipies = this.recipeService.getRecipes();
    if(recipies.length===0){
        return this.dataStorageService.fetchRecipies();
    }else{
        return recipies;
    }
    
}
}