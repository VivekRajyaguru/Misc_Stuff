import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }

  ngOnInit() {
  }


  saveData() {
    this.dataStorageService.storeRecipes().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  loadData() {
    this.dataStorageService.getRecipes().subscribe(
      data => {
        console.log(data);
        this.recipeService.setRecipe(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  

}
