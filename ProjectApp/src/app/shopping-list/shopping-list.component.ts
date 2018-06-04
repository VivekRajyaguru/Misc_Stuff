import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.models';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredients[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsChange.subscribe(
      (data) => {
        this.ingredients = data;
      }
    );
  }

  onIngridentAdded(event) {
    this.shoppingListService.addIngredients(event);
  }

}
