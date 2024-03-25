import { Component } from '@angular/core';
import {DecadeService} from "../decade.service";
import {DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-reservoir-schedule',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './reservoir-schedule.component.html',
  styleUrl: './reservoir-schedule.component.css'
})
export class ReservoirScheduleComponent {

  months: string[] = this.decadeService.months.splice(3, 6);
  decade: string[] = this.decadeService.decade.splice(0, 18);

  constructor(private decadeService: DecadeService) {
  }
}
