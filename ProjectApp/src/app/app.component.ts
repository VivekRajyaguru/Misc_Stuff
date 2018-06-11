import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  loadFlag = 'recipe';

  constructor() {

  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCI3Ni4NbFyQyWzJKohpSBq7At50lfjB7Y",
      authDomain: "myproject-app-7fa35.firebaseapp.com"
    });
  }

  onNavigate(event) {
    this.loadFlag = event;
  }

}
