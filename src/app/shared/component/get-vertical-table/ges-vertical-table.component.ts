import {Component, OnInit} from '@angular/core';
import {GesValues} from "../../interfaces";
import {GesService} from "../../service/ges.service";

@Component({
  selector: 'app-ges-vertical-table',
  templateUrl: './ges-vertical-table.component.html',
  styleUrls: ['./ges-vertical-table.component.css']
})
export class GesVerticalTableComponent implements OnInit {
  gesList: GesValues[] = []

  constructor(private _gesService: GesService) {
  }

  ngOnInit() {
    this.gesList = this._gesService.gesValues.slice(0,5)
  }

}
