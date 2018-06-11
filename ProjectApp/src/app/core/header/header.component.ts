import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RecipeService } from '../../recipes/recipe.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService,
  private authService: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    console.log(this.authService.isAuthenticated());
    this.authState = this.store.select('auth');
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


  onLogout() {
    this.authService.logOut();
  }
  

}
