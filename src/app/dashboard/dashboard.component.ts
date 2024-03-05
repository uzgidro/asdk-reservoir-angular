import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    RouterLink
  ],
  standalone: true
})
export class DashboardComponent implements OnInit {

  ngOnInit() {
    Chart.register(...registerables)
  }
}
