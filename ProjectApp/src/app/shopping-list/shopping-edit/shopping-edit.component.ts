import { Component, OnInit, OnDestroy, ViewChild,} from '@angular/core';
import { Ingredients } from '../../shared/ingredients.models';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from "../store/shopping-list.actions";
import * as AppStore from "../../store/app.reducers";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  editMode = false;
  editItem: Ingredients;

  constructor(private store: Store<AppStore.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(
      data => {
        if (data.editedIngredientIndex > -1) {
          this.editItem = data.editedIngredient
          this.editMode = true;
          this.form.setValue({
            'name': this.editItem.name,
            'amount': this.editItem.amount
          })
        } else {
          this.editMode = false;
        }
      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onAddItem(form: NgForm) {
  const value = form.value;
    if(this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredients({'newIngredient': new Ingredients(value.name, value.amount)}));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(new Ingredients(value.name, value.amount)))
    }
    this.editMode = false;
    this.form.reset();
  }

  onClear() {
    this.editMode = false;
    this.form.reset();
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredients());
    this.onClear();
  }

}
