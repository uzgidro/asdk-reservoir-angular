import { Component } from '@angular/core';
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-dashboard-snow-table',
  standalone: true,
  imports: [
    DecimalPipe
  ],
  templateUrl: './dashboard-snow-table.component.html',
  styleUrl: './dashboard-snow-table.component.css'
})
export class DashboardSnowTableComponent {

}
