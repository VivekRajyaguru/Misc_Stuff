import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../receipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(private _recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
    this.recipes = _recipeService.getRecipes();
  }

  ngOnInit() {
  }


  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
 

}
