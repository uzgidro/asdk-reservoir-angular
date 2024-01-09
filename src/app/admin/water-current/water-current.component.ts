import { Component } from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {MessageService} from "primeng/api";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-water-current',
  standalone: true,
  imports: [
    CalendarModule,
    DatePipe,
    FormsModule,
    DialogModule,
    DropdownModule
  ],
  templateUrl: './water-current.component.html',
  styleUrl: './water-current.component.css'
})
export class WaterCurrentComponent {
  today = new Date()
  selectedDate = this.today
  tomorrow = new Date(this.today.getDate() + 1)
  visible = false
  selectedMenu: any[] = []

  readonly weathers = ['Ясно', 'Облачно', 'Осадки']

  constructor(private messageService: MessageService) {
  }

  show() {
    this.visible = true
  }

  hide() {
    this.visible = false
    this.messageService.add({ severity: 'info', summary: 'Добавление', detail: 'Данные обновлены'})
  }
}
