import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../receipe.model';
import * as fromRecipe from '../store/recipes.reducers';
import * as RecipeActions from '../store/recipes.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router,
  private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['recipes']);
  }

  onSubmit() {
    console.log(this.recipeForm.value);
    if (this.editMode) {
      /* this.recipeService.updateRecipe(this.id , this.recipeForm.value); */
      this.store.dispatch(new RecipeActions.UpdateRecipes({index: this.id, newRecipe: this.recipeForm.value}));
    } else {
      /* this.recipeService.addRecipe(this.recipeForm.value); */
      this.store.dispatch(new RecipeActions.AddRecipes(this.recipeForm.value));
    }
    this.router.navigate(['recipes']);
  }

  initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      this.store.select('recipes').take(1).subscribe(
        (recipeState: fromRecipe.State) => {
          const recipe = recipeState.recipes[this.id];
          recipeName = recipe.name;
          recipeDescription = recipe.description;
          recipeImagePath = recipe.imagePath;
          if(recipe['ingredients']) {
            for(let item of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(item.name, Validators.required),
                  'amount': new FormControl(item.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                })
              );
            }
          }
        }
      )
      /* const recipe = this.recipeService.getRecipe(this.id); */

    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl('', Validators.required),
        'amount': new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
 
}
