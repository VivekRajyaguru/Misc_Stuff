import { Recipe } from "./receipe.model";
import { Injectable } from "@angular/core";
import { Ingredients } from "../shared/ingredients.models";
import { ShoppingListService } from "../shopping-list/shopping-list.service";


@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('Test ', 'Test Recipes', 'https://kfoods.com/photos/images_photos/photos/87087539_20149292378.jpg', [new Ingredients('Apple', 5), new Ingredients('Orange', 10)]),
        new Recipe('Test ', 'Test Recipes', 'https://kfoods.com/photos/images_photos/photos/87087539_20149292378.jpg', [new Ingredients('Tomatoes', 10), new Ingredients('Kiwi', 20)])
    ];

    constructor(private shoppingListService: ShoppingListService) {

    }

    getRecipes() {
        return this.recipes.slice();
    }

    addItemToCart(ingredients: Ingredients[]) {
        this.shoppingListService.addIngredient(ingredients);

    }

    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }
}