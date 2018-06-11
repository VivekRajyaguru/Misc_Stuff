import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.models';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as ShoppingListActions from "./store/shopping-list.actions";
import * as AppState from "../store/app.reducers";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<any>;
  constructor(private shoppingListService: ShoppingListService, private store:Store<AppState.AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');

  }



  onEditItem(index) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
