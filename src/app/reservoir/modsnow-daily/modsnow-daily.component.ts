import {Component, Input, OnInit} from '@angular/core';
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
import {ActivatedRoute} from "@angular/router";
import {array} from "@amcharts/amcharts5";

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
  @Input() itemCount: number = 3
  rivers: ModsnowImageResponse[] = [
    {
      name: 'asd',
      url: 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/75e68145-37de-44f1-baea-bcc999f55cee.jpeg'
    },
    {
      name: 'asd',
      url: 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/75e68145-37de-44f1-baea-bcc999f55cee.jpeg'
    },
    {
      name: 'asd',
      url: 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/75e68145-37de-44f1-baea-bcc999f55cee.jpeg'
    },
    {
      name: 'asd',
      url: 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/75e68145-37de-44f1-baea-bcc999f55cee.jpeg'
    },
    {
      name: 'asd',
      url: 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/75e68145-37de-44f1-baea-bcc999f55cee.jpeg'
    },
    {
      name: 'asd',
      url: 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/75e68145-37de-44f1-baea-bcc999f55cee.jpeg'
    },
    {
      name: 'asd',
      url: 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/75e68145-37de-44f1-baea-bcc999f55cee.jpeg'
    },
    {
      name: 'asd',
      url: 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/75e68145-37de-44f1-baea-bcc999f55cee.jpeg'
    },
    {
      name: 'asd',
      url: 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/75e68145-37de-44f1-baea-bcc999f55cee.jpeg'
    },
    {
      name: 'asd',
      url: 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/75e68145-37de-44f1-baea-bcc999f55cee.jpeg'
    },
    {
      name: 'asd',
      url: 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/75e68145-37de-44f1-baea-bcc999f55cee.jpeg'
    },
    {
      name: 'asd',
      url: 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/75e68145-37de-44f1-baea-bcc999f55cee.jpeg'
    },
  ]
  responsiveOptions: any[] = []
  isMainComponent: boolean = true;


  constructor(private modsnow: ModsnowService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // this.modsnow.getCover().subscribe(cover => {
    //   this.rivers = cover;
    // })

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
