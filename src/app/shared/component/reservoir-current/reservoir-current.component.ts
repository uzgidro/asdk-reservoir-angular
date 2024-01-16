import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-reservoir-current',
  standalone: true,
  imports: [],
  templateUrl: './reservoir-current.component.html',
  styleUrl: './reservoir-current.component.css'
})
export class ReservoirCurrentComponent {
  @Input() name: string = ''
  @Input() level: number = -1
  @Input() release: number = -1
  @Input() volume: number = -1
}
