import { Ingredients } from "../shared/ingredients.models";
import { EventEmitter } from "@angular/core";


export class ShoppingListService {
    ingredientsChange = new EventEmitter<any>();
    private ingredients: Ingredients[] = [
        new Ingredients('Apple', 5),
        new Ingredients('Tomatoes', 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }
    
    addIngredients(ingredients: Ingredients) {
        this.ingredients.push(ingredients);
        this.ingredientsChange.emit(this.ingredients.slice());
    }

    addIngredient(ingredients: Ingredients[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChange.emit(this.ingredients.slice());
    }
}