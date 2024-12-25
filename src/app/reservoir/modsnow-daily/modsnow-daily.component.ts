import {Component, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {EnvService} from "../../shared/service/env.service";
import {NgChartsModule} from "ng2-charts";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";

@Component({
  selector: 'app-modsnow-daily',
  standalone: true,
  imports: [
    CarouselModule,
    TagModule,
    ButtonModule,
    NgOptimizedImage,
    CalendarModule,
    FormsModule,
    NgChartsModule,
    CardHeaderComponent
  ],
  templateUrl: './modsnow-daily.component.html',
  styleUrl: './modsnow-daily.component.css'
})
export class ModsnowDailyComponent implements OnInit {
  reservoirs: {
    id: string
    name: string
  }[] = [];
  responsiveOptions: any[] = []

  constructor(private env: EnvService) {
  }

  ngOnInit() {
    this.setupData()

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

  setupData() {
    this.env.getRegions().filter(item => item.snowCoverage !== undefined).forEach(reservoir => {
      this.reservoirs.push({
        id: reservoir.id,
        name: reservoir.name,
      })
    })
  }
}
