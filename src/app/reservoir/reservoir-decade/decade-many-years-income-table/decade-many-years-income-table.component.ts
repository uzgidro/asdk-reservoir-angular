import {Component, OnInit} from '@angular/core';
import {LoaderComponent} from "../../../shared/component/loader/loader.component";
import {ApiService} from "../../../service/api.service";
import {Stock} from "../../../shared/interfaces";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-decade-many-years-income-table',
  imports: [
    LoaderComponent,
    NgIf,
    DatePipe,
    NgForOf
  ],
  templateUrl: './decade-many-years-income-table.component.html',
  standalone: true,
  styleUrl: './decade-many-years-income-table.component.css'
})
export class DecadeManyYearsIncomeTableComponent implements OnInit {

  data: Stock[] = []
  currentYear: Date = new Date
  pastYear: Date = new Date(new Date().setFullYear(this.currentYear.getFullYear() - 1))


  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getStock().subscribe({
      next: data => {
        this.data = data
      }
    })
  }
}
