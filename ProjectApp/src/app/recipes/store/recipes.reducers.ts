import { Recipe } from "../receipe.model";
import { Ingredients } from "../../shared/ingredients.models";
import * as RecipeActions  from "./recipes.actions";
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends  fromApp.AppState{
    receipes: State;
}


export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe('Test ', 'Test Recipes', 'https://kfoods.com/photos/images_photos/photos/87087539_20149292378.jpg', [new Ingredients('Apple', 5), new Ingredients('Orange', 10)]),
        new Recipe('Test ', 'Test Recipes', 'https://kfoods.com/photos/images_photos/photos/87087539_20149292378.jpg', [new Ingredients('Tomatoes', 10), new Ingredients('Kiwi', 20)])
    ]
}

export function recipeReducers(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state, recipes: [...action.payload]
            };
        case RecipeActions.ADD_RECIPES:
            return {
                ...state, receipe: [...state.recipes , action.payload]
            };
        case RecipeActions.UPDATE_RECIPES:
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe, ...action.payload.newRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state, receipes : recipes
            };
        case RecipeActions.DELETE_RECIPES:
            const oldAry = [...state.recipes];
            oldAry.splice(action.payload, 1);
            return {
                ...state, receipes : oldAry
            };
        default: 
            return state
    }
}