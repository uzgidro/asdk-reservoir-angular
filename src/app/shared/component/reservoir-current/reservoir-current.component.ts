import {Component, Input} from '@angular/core';
import {DecimalPipe, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";

@Component({
  selector: 'app-reservoir-current',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './reservoir-current.component.html',
  styleUrl: './reservoir-current.component.css'
})
export class ReservoirCurrentComponent {
  @Input() name: string = ''
  @Input() level?: {difference: number, latest: number}
  @Input() release?: {difference: number, latest: number}
  @Input() volume?: {difference: number, latest: number}
}
