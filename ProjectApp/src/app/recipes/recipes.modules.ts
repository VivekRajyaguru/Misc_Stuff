import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipesDetailsComponent } from "./recipes-details/recipes-details.component";
import { RecipesItemComponent } from "./recipes-list/recipes-item/recipes-item.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";
import { AuthGaurdService } from "../auth/auth-gaurd.service";
import { StoreModule } from "@ngrx/store";
import { recipeReducers } from './store/recipes.reducers';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        RecipesListComponent,
        RecipesDetailsComponent,
        RecipesItemComponent
    ],
    imports: [ReactiveFormsModule,RecipesRoutingModule, SharedModule, StoreModule.forFeature('recipes', recipeReducers )],
    providers: [AuthGaurdService],
    exports: []
})
export class RecipesModule {

}