import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-reservoir-yearly',
  standalone: true,
  templateUrl: './reservoir-yearly.component.html',
  imports: [
    NgForOf
  ],
  styleUrl: './reservoir-yearly.component.css'
})
export class ReservoirYearlyComponent {
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
