import { Component } from '@angular/core';
import {AggregateService} from "../../service/aggregate.service";

@Component({
  selector: 'app-aggregate-table',
  templateUrl: './aggregate-table.component.html',
  styleUrls: ['./aggregate-table.component.css']
})
export class AggregateTableComponent {

  constructor(private _agService: AggregateService) {
  }

  getAggregates() {
    return this._agService.aggregateList
  }
}
