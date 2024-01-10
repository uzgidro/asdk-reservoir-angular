import { Component } from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {DatePipe, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {MessageService, SharedModule} from "primeng/api";

@Component({
  selector: 'app-admin-hydro-works',
  templateUrl: './admin-hydro-works.component.html',
  standalone: true,
  imports: [
    CalendarModule,
    DatePipe,
    DialogModule,
    DropdownModule,
    NgIf,
    PaginatorModule,
    SharedModule
  ],
  styleUrl: './admin-hydro-works.component.css'
})
export class AdminHydroWorksComponent {
  visible = false
  selectedMenu: any[] = []
  today = new Date()
  reservoirs = ['Андижан', 'Ахангаран', 'Сардоба', 'Гисарак', 'Тупаланг', 'Чарвак']

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
