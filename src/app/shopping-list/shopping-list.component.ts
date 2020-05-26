import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

import { Subscription, Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private idChangedSub:Subscription;
ingredients:Observable<{ingredients : Ingredient[]}> ;
  constructor(
    private loggingService:LoggingService,
    private store : Store<fromRoot.AppState>) { }

  ngOnInit(): void {
    this.ingredients=this.store.select('shoppingList');
    // this.ingredients=this.slService.getIngredients();
    // this.idChangedSub = this.slService.ingredientsChanged.subscribe(
    //   (ingredients:Ingredient[]) => {
    //     this.ingredients=ingredients;
    //   }
    // );
    this.loggingService.printLog("Hello from Shopping List Component !");
  }
 
ngOnDestroy(){
 // this.idChangedSub.unsubscribe();
}
   onEditItem(index:number){
      this.store.dispatch(new ShoppingListActions.StartEdit(index));
  //this.slService.startedEditing.next(index);
    }
}
