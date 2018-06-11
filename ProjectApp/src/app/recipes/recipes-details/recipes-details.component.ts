import { Component, OnInit} from '@angular/core';
import { Recipe } from '../receipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable } from 'rxjs/Observable';
import * as fromRecipe from '../store/recipes.reducers';
import * as fromApp from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import * as RecipeAction from '../store/recipes.actions';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.css']
})
export class RecipesDetailsComponent implements OnInit {

  recipeState: Observable<fromRecipe.State>;
  id;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router,
  private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.id = +params['id'];
        this.recipeState = this.store.select('recipes');
      }
    );
  }

  addToCart() {
    this.store.select('recipes').take(1).subscribe((recipeState: fromRecipe.State) => {
      this.recipeService.addItemToCart(recipeState.recipes[this.id].ingredients);
    });
    

  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeAction.DeleteRecipes(this.id));
    /* this.recipeService.deleteRecipe(this.id); */
    this.router.navigate(['recipes']);
  }

}
