import {Component, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {NgOptimizedImage} from "@angular/common";
import {SharedModule} from "primeng/api";

@Component({
  selector: 'app-modsnow-yearly',
  standalone: true,
    imports: [
        CarouselModule,
        NgOptimizedImage,
        SharedModule
    ],
  templateUrl: './modsnow-yearly.component.html',
  styleUrl: './modsnow-yearly.component.css'
})
export class ModsnowYearlyComponent implements OnInit{
  reservoirs: Reservoir[] = [];

  ngOnInit() {
    this.reservoirs = this.getProductsData();
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
