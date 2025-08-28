import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <p-toast></p-toast>
  `,
  standalone: true,
  imports: [
    RouterOutlet,
    ToastModule
  ]
})
export class AppComponent {
}
