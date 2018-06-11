import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';


@Injectable()
export class DataStorageService {

    constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService,
    private store: Store<fromApp.AppState>) { }

    storeRecipes() {
    const token =  this.authService.getToken();
    return this.http.put('https://myproject-app-7fa35.firebaseio.com/recipes.json?auth='+token, this.recipeService.getRecipes())
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
        const token = this.authService.getToken();
        return this.http.get('https://myproject-app-7fa35.firebaseio.com/recipes.json?auth='+token)
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