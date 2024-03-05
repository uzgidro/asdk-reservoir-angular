import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-aggregate-values-table',
  templateUrl: './aggregate-values-table.component.html',
  styleUrls: ['./aggregate-values-table.component.css'],
  imports: [
    NgForOf
  ],
  standalone: true
})
export class AggregateValuesTableComponent {

}
