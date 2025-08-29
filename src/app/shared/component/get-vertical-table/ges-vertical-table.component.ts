import {Component, OnInit} from '@angular/core';
import {GesValues} from "../../interfaces";
import {GesService} from "../../service/ges.service";
import {DecimalPipe, LowerCasePipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AggregateTableFieldComponent} from "../aggregate-table-field/aggregate-table-field.component";

@Component({
    selector: 'app-ges-vertical-table',
    templateUrl: './ges-vertical-table.component.html',
    styleUrls: ['./ges-vertical-table.component.css'],
    imports: [
        NgForOf,
        RouterLink,
        DecimalPipe,
        MatTooltipModule,
        LowerCasePipe,
        NgIf,
        AggregateTableFieldComponent
    ],
  standalone: true,
})
export class GesVerticalTableComponent implements OnInit {
  gesList: GesValues[] = []

  constructor(private _gesService: GesService) {
  }

  ngOnInit() {
    this.gesList = this._gesService.gesValues.slice(0, 5)
  }

}
