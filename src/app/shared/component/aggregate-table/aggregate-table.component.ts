import { Component } from '@angular/core';
import {AggregateService} from "../../service/aggregate.service";
import {NgClass, NgForOf, PercentPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-aggregate-table',
    templateUrl: './aggregate-table.component.html',
    styleUrls: ['./aggregate-table.component.css'],
    imports: [
        NgForOf,
        NgClass,
        RouterLink,
        PercentPipe
    ]
})
export class AggregateTableComponent {

  constructor(private _agService: AggregateService) {
  }

  getAggregates() {
    return this._agService.aggregateList
  }
}
