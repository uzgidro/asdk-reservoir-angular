import {Component, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-modsnow-daily',
  standalone: true,
  imports: [
    CarouselModule,
    TagModule,
    ButtonModule,
    NgOptimizedImage,
    CalendarModule,
    FormsModule
  ],
  templateUrl: './modsnow-daily.component.html',
  styleUrl: './modsnow-daily.component.css'
})
export class ModsnowDailyComponent implements OnInit{
  reservoirs: Reservoir[] = [];
  responsiveOptions: any[] = []

  maxDate = new Date()
  selectedDate = new Date()

  ngOnInit() {
      this.reservoirs = this.getProductsData();

    this.responsiveOptions = [
      {
        breakpoint: '1499px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '1091px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  getProductsData() {
    return [
      {name: 'Андижан'},
      {name: 'Гисарак'},
      {name: 'Тупаланг'},
      {name: 'Сардоба'},
      {name: 'Ахангаран'},
      {name: 'Чарвак'},
    ]
  }
}

export interface Reservoir {
  name?: string;
}
