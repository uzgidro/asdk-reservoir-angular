import { Component } from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-modsnow',
  templateUrl: './admin-modsnow.component.html',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule
  ],
  styleUrl: './admin-modsnow.component.css'
})
export class AdminModsnowComponent {
  date = new Date()
  readonly today = new Date()
  files: Record<string, File> = {}

  constructor(private messageService: MessageService) {
  }

  submitModsnow() {
    this.messageService.add({ severity: 'success', summary: 'Обновление', detail: 'Данные Modsnow обновлены'})
  }

  documentOnChange(event: any, category: string) {
    const file:File = event.target.files[0];

    if (file) {
      this.files[category] = file
    }
  }
}
