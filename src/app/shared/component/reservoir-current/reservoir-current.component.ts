import {Component, Input} from '@angular/core';
import {DecimalPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-reservoir-current',
  imports: [
    NgIf,
    DecimalPipe
  ],
  templateUrl: './reservoir-current.component.html',
  standalone: true,
  styleUrl: './reservoir-current.component.css'
})
export class ReservoirCurrentComponent {
  @Input() name: string = ''
  @Input() level?: { difference: number, latest: number }
  @Input() release?: { difference: number, latest: number }
  @Input() volume?: { difference: number, latest: number }
}
