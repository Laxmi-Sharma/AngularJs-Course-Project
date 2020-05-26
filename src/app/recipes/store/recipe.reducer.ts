import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State {
    recipies: Recipe[];
}

const initialState: State = {
    recipies: []
}

export function recipeReducer(state: State = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPIES:
            return {
                ...state,
                recipies: [...action.payload]
            }
        case RecipeActions.ADD_RECIPIE:
            return {
                ...state,
                recipies: [...state.recipies, action.payload]
            }
        case RecipeActions.UPDATE_RECIPIE:
            const updatedRecipe = {
                ...state.recipies[action.payload.index],
                ...action.payload.newRecipe
            };
            const updatedRecipies = [...state.recipies];
            updatedRecipies[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipies: updatedRecipies
            }
        case RecipeActions.DELETE_RECIPIE:
            return {
                ...state,
                recipies: state.recipies.filter((recipe,index)=>{
                    return index!== action.payload;
                })
            }
        default:
            return state;
    }

}