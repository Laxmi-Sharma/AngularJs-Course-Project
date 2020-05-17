import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService{
    recipeChanged = new Subject<Recipe[]>();
    constructor(private slService:ShoppingListService){

    }
   // recipies:Recipe[] = [
    //     new Recipe('Tasty Schnitzel',
    //     'A super tasty Schnitzel - just awesome !',
    //     'https://image.shutterstock.com/image-photo/wiener-schnitzel-potato-salad-260nw-66357736.jpg',
    //     [
    //         new Ingredient('Meat',1),
    //         new Ingredient('French Fries',20)
    //     ]),
    //     new Recipe('Big fat Burger',
    //     'What else you need to say !!',
    //     'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202004/butter_chciken-770x433-770x433.jpeg',
    // [
    //     new Ingredient('Buns',2),
    //     new Ingredient('Meat',1),
    // ])
    //   ];
    recipies:Recipe[] =[];

    getRecipes(){
        return this.recipies.slice();
    }
    getRecipe(index:number){
        return this.recipies.slice()[index];
    }
    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe:Recipe){
        this.recipies.push(recipe);
        this.recipeChanged.next(this.recipies.slice());
    }

    updateRecipe(index:number,newRecipe:Recipe){
        this.recipies[index]= newRecipe;
        this.recipeChanged.next(this.recipies.slice());
    }
    deleteRecipe(index:number){
        this.recipies.splice(index,1);
        this.recipeChanged.next(this.recipies.slice());
    }

    setRecipies(recipies : Recipe[]){
        this.recipies = recipies;
        this.recipeChanged.next(this.recipies.slice())
    }
    }