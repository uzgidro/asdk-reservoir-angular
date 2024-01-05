import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-reservoir-yearly',
  standalone: true,
  templateUrl: './reservoir-yearly.component.html',
  imports: [
    NgForOf,
    CalendarModule,
    FormsModule
  ],
  styleUrl: './reservoir-yearly.component.css'
})
export class ReservoirYearlyComponent {
  maxDate = new Date()
  selectedDate = new Date()
  months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]
}
