import {Component, OnInit} from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {NgForOf} from "@angular/common";
import {EnvService} from "../../shared/service/env.service";
import {RegionInfo} from "../../../environments/environment.development";

@Component({
  selector: 'app-modsnow',
  templateUrl: './admin-modsnow.component.html',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule,
    NgForOf
  ],
  styleUrl: './admin-modsnow.component.css'
})
export class AdminModsnowComponent implements OnInit{
  date = new Date()
  readonly today = new Date()
  files: Record<string, File> = {}
  regions?: RegionInfo[]

  constructor(private messageService: MessageService, private env: EnvService) {
  }

  ngOnInit() {
    this.regions = this.env.getRegions()
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
