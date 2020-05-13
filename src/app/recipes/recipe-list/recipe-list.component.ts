import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

recipies:Recipe[] =[];
recipeSub:Subscription;

constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeSub = this.recipeService.recipeChanged.subscribe(
      (recipies:Recipe[])=>{
        this.recipies=recipies;
      }
    );
    this.recipies=this.recipeService.getRecipes();
  }
  onNewRecipe(){
this.router.navigate(['new'],{relativeTo:this.route});
  }
  ngOnDestroy(){
this.recipeSub.unsubscribe();
  }

}
