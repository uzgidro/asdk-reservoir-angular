import {Component, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {NgOptimizedImage} from "@angular/common";
import {SharedModule} from "primeng/api";
import {EnvService} from "../../shared/service/env.service";
import {NgChartsModule} from "ng2-charts";

@Component({
  selector: 'app-modsnow-yearly',
  standalone: true,
  imports: [
    CarouselModule,
    NgOptimizedImage,
    SharedModule,
    NgChartsModule
  ],
  templateUrl: './modsnow-yearly.component.html',
  styleUrl: './modsnow-yearly.component.css'
})
export class ModsnowYearlyComponent implements OnInit {
  reservoirs: {
    id: string
    name: string
  }[] = [];
  responsiveOptions: any[] = []

  constructor(private env: EnvService) {
  }

  ngOnInit() {
    this.env.getRegions().forEach(item => {
      this.reservoirs.push({
        id: item.id,
        name: item.name
      })
    })

    this.responsiveOptions = [
      {
        breakpoint: '1499px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }


}
