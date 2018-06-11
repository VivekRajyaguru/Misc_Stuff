import { Action } from "@ngrx/store";
import { Recipe } from "../receipe.model";


export const SET_RECIPES = "SET_RECIPES";
export const ADD_RECIPES = "ADD_RECIPES";
export const UPDATE_RECIPES = "UPDATE_RECIPES";
export const DELETE_RECIPES = "DELETE_RECIPES";

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]){}
}

export class AddRecipes implements Action {
    readonly type = ADD_RECIPES;
    constructor(public payload: Recipe){}
}

export class UpdateRecipes implements Action {
    readonly type = UPDATE_RECIPES;
    constructor(public payload: {index: number, newRecipe: Recipe}){}
}


export class DeleteRecipes implements Action {
    readonly type = DELETE_RECIPES;
    constructor(public payload: number){}
}


export type RecipeActions = SetRecipes | AddRecipes | UpdateRecipes | DeleteRecipes;