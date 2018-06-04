import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../receipe.model';
import { RecipeService } from '../../recipe.service';


@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  @Input() recipe: Recipe;
  
  constructor(private _recipeService: RecipeService) { }

  ngOnInit() {
  }

  onSelect() {
    this._recipeService.selectedEvent.emit(this.recipe);
  }

}
