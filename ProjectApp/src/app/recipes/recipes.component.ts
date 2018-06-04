import { Component, OnInit } from '@angular/core';
import { Recipe } from './receipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(private _recipeService: RecipeService) { }

  ngOnInit() {
    this._recipeService.selectedEvent.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
      }
    );
  }



}
