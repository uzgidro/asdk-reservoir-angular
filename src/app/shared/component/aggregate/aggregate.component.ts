import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.css']
})
export class AggregateComponent {
  @Input() aggregates: number = 0
}
