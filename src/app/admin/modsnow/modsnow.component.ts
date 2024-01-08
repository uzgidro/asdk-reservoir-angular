import { Component } from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-modsnow',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule
  ],
  templateUrl: './modsnow.component.html',
  styleUrl: './modsnow.component.css'
})
export class ModsnowComponent {
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
