import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ApiService} from "../../service/api.service";
import {Modsnow} from "../../shared/interfaces";
import {LoaderComponent} from "../../shared/component/loader/loader.component";

@Component({
    selector: 'app-dashboard-snow-table',
    imports: [
        NgIf,
        LoaderComponent,
        NgForOf
    ],
    templateUrl: './dashboard-snow-table.component.html',
    styleUrl: './dashboard-snow-table.component.css'
})
export class DashboardSnowTableComponent implements OnInit {

  data: Modsnow[] = []

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getModsnow().subscribe({
      next: data => {
        this.data = data;
      }
    })
  }
}
