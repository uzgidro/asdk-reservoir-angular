import {Component, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {SharedModule} from "primeng/api";
import {ApiService} from "../../service/api.service";
import {Observable} from "rxjs";
import {ModsnowImg} from "../../shared/interfaces";
import {LoaderComponent} from "../../shared/component/loader/loader.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-dashboard-snow-slider',
  imports: [
    CarouselModule,
    SharedModule,
    LoaderComponent,
    NgOptimizedImage
  ],
  templateUrl: './dashboard-snow-slider.component.html',
  standalone: true,
  styleUrl: './dashboard-snow-slider.component.css'
})
export class DashboardSnowSliderComponent implements OnInit {

  images$!: Observable<ModsnowImg[]>;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.images$ = this.apiService.getModsnowDynamics()
  }

}
