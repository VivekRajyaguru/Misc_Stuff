import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AuthGaurdService } from '../auth/auth-gaurd.service';
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component';


const routes: Routes = [
    {path: '', component: RecipesComponent, children: [
        {path: '', component: RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent, canActivate: [AuthGaurdService]},
        {path: ':id', component: RecipesDetailsComponent},
        {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGaurdService]}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule { }