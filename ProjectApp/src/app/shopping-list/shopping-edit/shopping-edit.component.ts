import { Component, OnInit, OnDestroy, ViewChild,} from '@angular/core';
import { Ingredients } from '../../shared/ingredients.models';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex;
  editItem: Ingredients;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
   this.subscription = this.shoppingListService.editShoppingList.subscribe(
      (number) => {
        this.editItemIndex = number;
        this.editMode = true;
        this.editItem = this.shoppingListService.getIngredient(this.editItemIndex); 
        this.form.setValue({
          'name': this.editItem.name,
          'amount': this.editItem.amount
        })
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
  const value = form.value;
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemIndex, new Ingredients(value.name, value.amount));
    } else {
      this.shoppingListService.addIngredients(new Ingredients(value.name, value.amount));
    }
    this.editMode = false;
    this.form.reset();
  }

  onClear() {
    this.editMode = false;
    this.form.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

}
