import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard-map',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './dashboard-map.component.html',
  styleUrl: './dashboard-map.component.css'
})
export class DashboardMapComponent {

}
