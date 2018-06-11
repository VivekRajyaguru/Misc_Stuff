import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';



@NgModule({
    imports: [CommonModule, FormsModule, ShoppingListRoutingModule],
    exports: [],
    declarations: [ShoppingListComponent,
        ShoppingEditComponent],
    providers: [],
})
export class ShoppingListModule { }
