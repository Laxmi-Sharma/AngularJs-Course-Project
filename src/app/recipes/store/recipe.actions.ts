import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPIES = '[Recipies] Set Recipies';
export const FETCH_RECIPIES = '[Recipies] Fetch Recipies';
export const ADD_RECIPIE = '[Recipies] Add Recipe';
export const UPDATE_RECIPIE = '[Recipies] Update Recipies';
export const DELETE_RECIPIE = '[Recipies] Delete Recipies';
export const STORE_RECIPIES = '[Recipies] Store Recipies';

export class AddRecipe implements Action{
    readonly type=ADD_RECIPIE;
    constructor(public payload : Recipe){}
}
export class UpdateRecipe implements Action{
    readonly type=UPDATE_RECIPIE;
    constructor(public payload : {index:number,newRecipe:Recipe}){}
}
export class DeleteRecipe implements Action{
    readonly type=DELETE_RECIPIE;
    constructor(public payload : number){}
}

export class SetRecipies implements Action{
    readonly type=SET_RECIPIES;
    constructor(public payload : Recipe[]){}
}

export class FetchRecipies implements Action{
    readonly type=FETCH_RECIPIES;
    
}
export class StoreRecipies implements Action{
    readonly type=STORE_RECIPIES;
    
}

export type RecipeActions = SetRecipies|FetchRecipies
|AddRecipe
|UpdateRecipe
|DeleteRecipe
|StoreRecipies;