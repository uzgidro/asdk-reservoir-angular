import {Component, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {NgOptimizedImage} from "@angular/common";
import {SharedModule} from "primeng/api";
import {NgChartsModule} from "ng2-charts";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {ModsnowService} from "../../service/modsnow.service";
import {ModsnowImageResponse} from "../../shared/response/modsnow-response";
import {CardWrapperComponent} from "../../shared/component/card-wrapper/card-wrapper.component";

@Component({
  selector: 'app-modsnow-yearly',
  standalone: true,
  imports: [
    CarouselModule,
    NgOptimizedImage,
    SharedModule,
    NgChartsModule,
    CardHeaderComponent,
    CardWrapperComponent
  ],
  templateUrl: './modsnow-yearly.component.html',
  styleUrl: './modsnow-yearly.component.css'
})
export class ModsnowYearlyComponent implements OnInit {
  rivers: ModsnowImageResponse[] = [];
  responsiveOptions: any[] = []

  constructor(private modsnow: ModsnowService) {
  }

  ngOnInit() {
    this.modsnow.getDynamics().subscribe(dynamics => {
      this.rivers = dynamics;
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
