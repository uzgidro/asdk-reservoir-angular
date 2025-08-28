import {Component, Input, OnInit} from '@angular/core';
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {OperativeValueResponse} from "../../../shared/response/values-response";
import {ApiService} from "../../../service/api.service";
import {LoaderComponent} from "../../../shared/component/loader/loader.component";
import {DifferencePipe} from "../../../shared/pipe/difference.pipe";

@Component({
    selector: 'app-operative-table',
    imports: [
        DatePipe,
        DecimalPipe,
        NgForOf,
        LoaderComponent,
        NgIf,
        NgClass,
        DifferencePipe
    ],
    templateUrl: './operative-table.component.html',
    styleUrl: './operative-table.component.css'
})
export class OperativeTableComponent implements OnInit {
  @Input() shortView: boolean = false
  operativeData: OperativeValueResponse[] = []

  today = new Date();
  yesterday = new Date().setDate(this.today.getDate() - 1);
  pastYear = new Date().setFullYear(this.today.getFullYear() - 1);
  beforePastYear = new Date().setFullYear(this.today.getFullYear() - 2);
  beforeBeforePastYear = new Date().setFullYear(this.today.getFullYear() - 3);

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getOperativeValues().subscribe({
      next: (response: OperativeValueResponse[]) => {
        this.operativeData = response
      }
    })
  }

}
