import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-aggregate-table-field',
  templateUrl: './aggregate-table-field.component.html',
  styleUrls: ['./aggregate-table-field.component.css']
})
export class AggregateTableFieldComponent {
  @Input() aggregates: number = 0
}
