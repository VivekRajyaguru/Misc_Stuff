import * as ShoppingListActions from "./shopping-list.actions";
import { Ingredients } from "../../shared/ingredients.models";




export interface State {
    ingredients: Ingredients[];
    editedIngredient: Ingredients;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredients('Apple', 5),
        new Ingredients('Tomatoes', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state, ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENTS:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updated = {
                ...ingredient, ...action.payload.newIngredient 
            }
            const oldAray = [...state.ingredients];
            oldAray[state.editedIngredientIndex] = updated;
            return {
                ...state, ingredients: oldAray, editedIngredient: null ,editedIngredientIndex: -1
            };
        case ShoppingListActions.DELETE_INGREDIENTS:
            const ingredients  = [...state.ingredients];
            ingredients.splice(state.editedIngredientIndex, 1);
            return {
                ...state, ingredients: ingredients, editedIngredient: null ,editedIngredientIndex: -1
            };
        case ShoppingListActions.START_EDIT:
            const editedIngredient = {...state.ingredients[action.payload]}
            return {
                ...state, editedIngredientIndex: action.payload, editedIngredient: editedIngredient
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state, editedIngredient: null ,editedIngredientIndex: -1
            }
        default: 
            return state;   
    }    
}