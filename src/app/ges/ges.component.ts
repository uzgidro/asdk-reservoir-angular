import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";
import {
  AggregateValuesTableComponent
} from "../shared/component/aggregate-values-table/aggregate-values-table.component";
import {GesTableComponent} from "../shared/component/ges-table/ges-table.component";
import {AggregateTableComponent} from "../shared/component/aggregate-table/aggregate-table.component";
import {ChartsTempComponent} from "../shared/temp/charts-temp/charts-temp.component";

@Component({
    selector: 'app-ges',
    templateUrl: './ges.component.html',
    styleUrls: ['./ges.component.css'],
    imports: [
        GesTableComponent,
        NgIf,
        AggregateTableComponent,
        ChartsTempComponent,
        AggregateValuesTableComponent
    ]
})
export class GesComponent implements OnInit {

  queryGes?: string
  queryAggregate?: string

  constructor(private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this._route.queryParams
      .subscribe(params => {
        this.queryGes = params['name']
        this.queryAggregate = params['agg']
      })
  }

}
