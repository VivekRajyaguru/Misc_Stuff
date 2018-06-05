import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../receipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;
  constructor(private _recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
    this.recipes = _recipeService.getRecipes();
  }

  ngOnInit() {
    this.subscription = this._recipeService.recipeChange.subscribe(
      (recipes) => {
        this.recipes =  recipes;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
 

}
