import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../receipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(private _recipeService: RecipeService) {
    this.recipes = _recipeService.getRecipes();
  }

  ngOnInit() {
  }

 

}
