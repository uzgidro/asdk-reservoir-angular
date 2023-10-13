import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ngOnInit() {
    Chart.register(...registerables)
  }

  tabclick(event: any, city: string) {
    let tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    (event.currentTarget as HTMLElement).className += " active";

  }
}
