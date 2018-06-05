import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import 'rxjs/Rx';

@Injectable()
export class DataStorageService {

    constructor(private http: Http, private recipeService: RecipeService) { }

    storeRecipes() {
    return this.http.put('https://myproject-app-7fa35.firebaseio.com/recipes.json', this.recipeService.getRecipes())
        .map(
            (data)=> {
                return data.json();
            }
        ).catch(
            (error) => {
                return error;
            }
        );
    }

    getRecipes() {
        return this.http.get('https://myproject-app-7fa35.firebaseio.com/recipes.json')
        .map(
            (data)=> {
                return data.json();
            }
        ).catch(
            (error) => {
                return error;
            }
        );
    }
}