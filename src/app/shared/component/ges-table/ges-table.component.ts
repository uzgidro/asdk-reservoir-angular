import {Component, Input, OnInit} from '@angular/core';
import {GesService} from "../../service/ges.service";
import {GesValues} from "../../interfaces";
import {MatTooltipModule} from "@angular/material/tooltip";
import {DecimalPipe, LowerCasePipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AggregateTableFieldComponent} from "../aggregate-table-field/aggregate-table-field.component";

@Component({
    selector: 'app-ges-table',
    templateUrl: './ges-table.component.html',
    styleUrls: ['./ges-table.component.css'],
    imports: [
        MatTooltipModule,
        NgForOf,
        RouterLink,
        LowerCasePipe,
        AggregateTableFieldComponent,
        DecimalPipe,
        NgIf
    ],
  standalone: true,
})
export class GesTableComponent implements OnInit{

  private selectedTab?: string
  private ascSort?: boolean
  gesList: GesValues[] = []
  @Input() queryRegion: string = ''

  constructor(private _gesService: GesService) {
  }

  ngOnInit() {
    if (this.queryRegion == '') {
      this.gesList = this._gesService.gesValues
    } else {
      this.gesList = this._gesService.gesValues.slice(0,5)
    }
  }

  private resetArrow(event: any, thead: any) {
    if (this.selectedTab != event.target.firstChild.textContent) {
      // iterate children <th>
      for (const child of thead.children) {
        // check if sortable (cursor-pointer)
        if (child.classList.contains('cursor-pointer')) {
          // if svg is not 'arrows' -> set 'arrows'
          if (!child.lastChild.lastChild.data.includes('arrows.svg')) {
            child.lastChild.lastChild.data = '../../assets/icons/arrows.svg'
          }
        }
      }
    }
  }

  private isAscSort(event: any) {
    const selected = event.target.textContent
    if (selected != this.selectedTab) {
      this.ascSort = true
    } else {
      this.ascSort = !this.ascSort
    }
    this.selectedTab = selected
  }
}
