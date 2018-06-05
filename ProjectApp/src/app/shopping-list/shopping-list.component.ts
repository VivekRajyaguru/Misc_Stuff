import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredients } from '../shared/ingredients.models';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredients[] = [];
  subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChange.subscribe(
      (data) => {
        this.ingredients = data;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }

  onIngridentAdded(event) {
    this.shoppingListService.addIngredients(event);
  }

  onEditItem(index) {
    this.shoppingListService.editShoppingList.next(index); 
  }

}
