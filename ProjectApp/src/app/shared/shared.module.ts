import { NgModule } from '@angular/core';

import { DropDownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [DropDownDirective, CommonModule],
    declarations: [DropDownDirective],
    providers: [],
})
export class SharedModule { }
