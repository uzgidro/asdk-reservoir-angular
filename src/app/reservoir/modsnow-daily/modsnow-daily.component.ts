import {Component, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {NgChartsModule} from "ng2-charts";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {ModsnowService} from "../../service/modsnow.service";
import {ModsnowImageResponse} from "../../shared/response/modsnow-response";

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
  rivers: ModsnowImageResponse[] = []
  responsiveOptions: any[] = []

  constructor(private modsnow: ModsnowService) {
  }

  ngOnInit() {
    this.modsnow.getCover().subscribe(cover => {
      this.rivers = cover;
    })

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
}
