import {Component, Input, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {ActivatedRoute} from "@angular/router";
import {CardWrapperComponent} from "../../shared/component/card-wrapper/card-wrapper.component";
import {Observable} from "rxjs";
import {ModsnowImg} from "../../shared/interfaces";
import {ApiService} from "../../service/api.service";
import {LoaderComponent} from "../../shared/component/loader/loader.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-modsnow-daily',
  imports: [
    CarouselModule,
    TagModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    CardHeaderComponent,
    CardWrapperComponent,
    LoaderComponent,
    NgOptimizedImage
  ],
  templateUrl: './modsnow-daily.component.html',
  standalone: true,
  styleUrl: './modsnow-daily.component.css'
})
export class ModsnowDailyComponent implements OnInit {
  @Input() itemCount: number = 3
  responsiveOptions: any[] = []
  isMainComponent: boolean = true;


  images$!: Observable<ModsnowImg[]>;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.images$ = this.apiService.getModsnowDynamics()

    this.activatedRoute.url.subscribe({
      next: value => {
        if (value[0].path === 'dashboard') {
          this.isMainComponent = false
        }
      },
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
