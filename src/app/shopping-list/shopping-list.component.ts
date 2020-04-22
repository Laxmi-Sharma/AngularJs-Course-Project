import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private idChangedSub:Subscription;
ingredients:Ingredient[]=[];
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients=this.slService.getIngredients();
    this.idChangedSub = this.slService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[]) => {
        this.ingredients=ingredients;
      }
    );
  }
 
ngOnDestroy(){
  this.idChangedSub.unsubscribe();
}
onEditItem(index:number){
this.slService.startedEditing.next(index);
}
}
