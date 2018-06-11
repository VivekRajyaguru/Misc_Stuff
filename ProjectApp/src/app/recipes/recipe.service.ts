import { Recipe } from "./receipe.model";
import { Injectable } from "@angular/core";
import { Ingredients } from "../shared/ingredients.models";
import { Subject } from "rxjs/Subject";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as AppStore from "../store/app.reducers";

@Injectable()
export class RecipeService {
    recipeChange = new Subject<any>();

    private recipes: Recipe[] = [
        new Recipe('Test ', 'Test Recipes', 'https://kfoods.com/photos/images_photos/photos/87087539_20149292378.jpg', [new Ingredients('Apple', 5), new Ingredients('Orange', 10)]),
        new Recipe('Test ', 'Test Recipes', 'https://kfoods.com/photos/images_photos/photos/87087539_20149292378.jpg', [new Ingredients('Tomatoes', 10), new Ingredients('Kiwi', 20)])
    ];

    constructor(private store: Store<AppStore.AppState>) {

    }

    getRecipes() {
        return this.recipes.slice();
    }

    addItemToCart(ingredients: Ingredients[]) {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));

    }

    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChange.next(this.recipes.slice());
    }

    updateRecipe(index, recipe) {
        this.recipes[index] = recipe;
        this.recipeChange.next(this.recipes.slice());
    }

    deleteRecipe(index) {
        this.recipes.splice(index);
        this.recipeChange.next(this.recipes.slice());
    }

    setRecipe(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChange.next(this.recipes.slice());
    }
}