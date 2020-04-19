import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();
    constructor(private slService:ShoppingListService){

    }
    recipies:Recipe[] = [
        new Recipe('Tasty Schnitzel',
        'A super tasty Schnitzel - just awesome !',
        'https://image.shutterstock.com/image-photo/wiener-schnitzel-potato-salad-260nw-66357736.jpg',
        [
            new Ingredient('Meat',1),
            new Ingredient('French Fries',20)
        ]),
        new Recipe('Big fat Burger',
        'What else you need to say !!',
        'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202004/butter_chciken-770x433-770x433.jpeg',
    [
        new Ingredient('Buns',2),
        new Ingredient('Meat',1),
    ])
      ];
getRecipes(){
    return this.recipies.slice();
}
addIngredientsToShoppingList(ingredients:Ingredient[]){
this.slService.addIngredients(ingredients);
}
    }