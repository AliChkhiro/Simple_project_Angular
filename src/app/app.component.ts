import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {


  actions : Array<any> = [
    { title: "Home", "route": "/home", "icon" : "house-door-fill" },
    { title: "Products", "route": "/products", "icon" : "box-seam-fill" },
    { title: "New Product", "route": "/newProduct", "icon" : "plus-circle-fill" }
  ];

  currentAction: any;

  setCurrentAction(action:any) {
this.currentAction = action;

}
}
