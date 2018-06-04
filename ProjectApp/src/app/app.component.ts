import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loadFlag = 'recipe';

  constructor() {

  }

  onNavigate(event) {
    this.loadFlag = event;
  }

}
