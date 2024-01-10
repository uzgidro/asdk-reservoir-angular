import { Component } from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {DatePipe, NgIf} from "@angular/common";
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
    DropdownModule,
    NgIf
  ],
  templateUrl: './admin-water-current.component.html',
  styleUrl: './admin-water-current.component.css'
})
export class AdminWaterCurrentComponent {
  today = new Date()
  selectedDate = this.today
  tomorrow = new Date(this.today.getDate() + 1)
  visible = false
  selectedMenu: any[] = []
  selectedCategory?: Category

  readonly weathers = ['Ясно', 'Облачно', 'Осадки']

  constructor(private messageService: MessageService) {
  }

  show(category: Category) {
    this.selectedCategory = category
    this.visible = true
  }

  hide() {
    this.visible = false
    this.messageService.add({ severity: 'info', summary: 'Добавление', detail: 'Данные обновлены'})
  }

  protected readonly Category = Category;
}

enum Category {
  ALL = 0,
  WEATHER = 1,
  LEVEL = 2,
  VOLUME = 3,
  INCOME = 4
}
