import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    ingredients:Ingredient[]=[
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10)
      ];

      getIngredients(){
          return this.ingredients.slice();
      }

      updateIngredient(index:number, newIngredient:Ingredient){
        this.ingredients[index]= newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }
      deleteIngredient(index:number){
          this.ingredients.splice(index,1);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      getIngredient(index:number){
          return this.ingredients[index];
      }
      addIngredient(newIngredient:Ingredient){
        this.ingredients.push(newIngredient);
        this.ingredientsChanged.next(this.ingredients.slice());
          }
    addIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice())
          }
}