import {Component, Input} from '@angular/core';
import {DecimalPipe} from "@angular/common";

@Component({
    selector: 'app-aggregate-table-field',
    templateUrl: './aggregate-table-field.component.html',
    styleUrls: ['./aggregate-table-field.component.css'],
    imports: [
        DecimalPipe
    ]
})
export class AggregateTableFieldComponent {
  @Input() aggregates: number = 0
}
