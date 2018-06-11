import * as fromShoppinglist from "../shopping-list/store/shopping-list.reducers";
import * as fromAuth from "../auth/store/auth.reducers";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
    shoppingList: fromShoppinglist.State;
    auth: fromAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
    shoppingList: fromShoppinglist.shoppingListReducer,
    auth: fromAuth.AuthReducer
};