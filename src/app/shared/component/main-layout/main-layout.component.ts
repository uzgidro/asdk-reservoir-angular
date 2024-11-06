import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarModule} from "primeng/sidebar";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  imports: [
    NavbarComponent,
    RouterOutlet,
    SidebarModule
  ],
  standalone: true

})
export class MainLayoutComponent {
  isSidebarVisible = false;

  toggleSidebar(isVisible: boolean) {
    this.isSidebarVisible = isVisible;
  }
}
