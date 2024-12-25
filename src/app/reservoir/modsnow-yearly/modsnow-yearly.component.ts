import {Component, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {NgOptimizedImage} from "@angular/common";
import {SharedModule} from "primeng/api";
import {EnvService} from "../../shared/service/env.service";
import {NgChartsModule} from "ng2-charts";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";

@Component({
  selector: 'app-modsnow-yearly',
  standalone: true,
  imports: [
    CarouselModule,
    NgOptimizedImage,
    SharedModule,
    NgChartsModule,
    CardHeaderComponent
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
    this.env.getRegions().filter(item => item.snowCoverage !== undefined).forEach(item => {
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
