import {Component, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {NgOptimizedImage} from "@angular/common";
import {SharedModule} from "primeng/api";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {CardWrapperComponent} from "../../shared/component/card-wrapper/card-wrapper.component";
import {Observable} from "rxjs";
import {ModsnowImg} from "../../shared/interfaces";
import {ApiService} from "../../service/api.service";
import {LoaderComponent} from "../../shared/component/loader/loader.component";

@Component({
    selector: 'app-modsnow-yearly',
    imports: [
        CarouselModule,
        NgOptimizedImage,
        SharedModule,
        CardHeaderComponent,
        CardWrapperComponent,
        LoaderComponent
    ],
    templateUrl: './modsnow-yearly.component.html',
    styleUrl: './modsnow-yearly.component.css'
})
export class ModsnowYearlyComponent implements OnInit {
  responsiveOptions: any[] = []
  images$!: Observable<ModsnowImg[]>;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.images$ = this.apiService.getModsnowCover()

    this.responsiveOptions = [
      {
        breakpoint: '1499px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }


}
