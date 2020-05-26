import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as fromRoot from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

recipies:Recipe[] =[];
recipeSub:Subscription;

constructor(private router:Router,
  private store:Store<fromRoot.AppState>,
  private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeSub = this.store.select('recipies').pipe(map(recipiesState => recipiesState.recipies)).subscribe(
      (recipies:Recipe[])=>{
        this.recipies=recipies;
      }
    );
    
  }
  onNewRecipe(){
this.router.navigate(['new'],{relativeTo:this.route});
  }
  ngOnDestroy(){
this.recipeSub.unsubscribe();
  }

}
