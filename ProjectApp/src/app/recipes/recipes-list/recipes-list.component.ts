import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../receipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipes.reducers';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Observable<fromRecipe.State>;
  constructor(private router: Router, private route: ActivatedRoute
  ,private store: Store<fromRecipe.FeatureState>) {
  }

  ngOnInit() {
    this.recipes = this.store.select('recipes');
    
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
 

}
