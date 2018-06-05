import { Ingredients } from "../shared/ingredients.models";
import { Subject } from "rxjs/Subject";


export class ShoppingListService {
    ingredientsChange = new Subject<any>();
    editShoppingList = new Subject<number>();
    private ingredients: Ingredients[] = [
        new Ingredients('Apple', 5),
        new Ingredients('Tomatoes', 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }
    
    addIngredients(ingredients: Ingredients) {
        this.ingredients.push(ingredients);
        this.ingredientsChange.next(this.ingredients.slice());
    }

    addIngredient(ingredients: Ingredients[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChange.next(this.ingredients.slice());
    }

    getIngredient(index: number): Ingredients {
        return this.ingredients.slice()[index];
    }

    updateIngredient(index: number, ingredients: Ingredients) {
        this.ingredients[index] = ingredients;
        this.ingredientsChange.next(this.ingredients.slice());
    }

    deleteIngredient(index) {
        this.ingredients.splice(index);
        this.ingredientsChange.next(this.ingredients.slice());
    }
}