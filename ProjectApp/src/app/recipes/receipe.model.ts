import { Ingredients } from "../shared/ingredients.models";


export class Recipe {
    name: string;
    description: string;
    imagePath: string;
    ingredients: Ingredients[]

    constructor(name: string, description:string, imagePath: string, ingredients: Ingredients[]) {  
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
} 