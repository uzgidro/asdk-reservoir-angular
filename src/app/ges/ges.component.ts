import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ges',
  templateUrl: './ges.component.html',
  styleUrls: ['./ges.component.css']
})
export class GesComponent implements OnInit{

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
