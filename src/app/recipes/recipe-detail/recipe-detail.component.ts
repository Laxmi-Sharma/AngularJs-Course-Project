import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(
    private store: Store<fromRoot.AppState>,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.pipe(map(params => {
      return +params['id'];
    }),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipies');
      }),
      map(recipiesState => {
        return recipiesState.recipies.find((recipe, index) => {
          return index === this.id;
        });
      })).subscribe(recipe => {
        this.recipe = recipe;
      });
  }
  onAddToShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }
  onEditRecipe() {
    // this.router.navigate(['edit'],{relativeTo:this.route});
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }
  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
