import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredients } from '../../shared/ingredients.models';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('name') nameRef: ElementRef;
  @ViewChild('amount') amountRef: ElementRef;
  @Output() itemAdded = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  save() {
    const name = this.nameRef.nativeElement.value;
    const amount = this.amountRef.nativeElement.value;
    this.itemAdded.emit(new Ingredients(name, amount));
  }

}
