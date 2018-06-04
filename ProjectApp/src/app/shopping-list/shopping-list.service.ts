import { Ingredients } from "../shared/ingredients.models";
import { Subject } from "rxjs/Subject";


export class ShoppingListService {
    ingredientsChange = new Subject<any>();
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
}