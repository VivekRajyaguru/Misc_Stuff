import { Ingredients } from "../shared/ingredients.models";
import { Subject } from "rxjs/Subject";


export class ShoppingListService {
    ingredientsChange = new Subject<any>();
    editShoppingList = new Subject<number>();
    private ingredients: Ingredients[] = [
        new Ingredients('Apple', 5),
        new Ingredients('Tomatoes', 10)
    ];

    getIngredient(index: number): Ingredients {
        return this.ingredients.slice()[index];
    }

}