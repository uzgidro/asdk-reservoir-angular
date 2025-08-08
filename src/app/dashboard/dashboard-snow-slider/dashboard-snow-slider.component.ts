import {Component, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {SharedModule} from "primeng/api";
import {ApiService} from "../../service/api.service";
import {NgOptimizedImage} from "@angular/common";
import {Observable} from "rxjs";
import {ModsnowImg} from "../../shared/interfaces";
import {LoaderComponent} from "../../shared/component/loader/loader.component";

@Component({
  selector: 'app-dashboard-snow-slider',
  standalone: true,
  imports: [
    CarouselModule,
    SharedModule,
    NgOptimizedImage,
    LoaderComponent
  ],
  templateUrl: './dashboard-snow-slider.component.html',
  styleUrl: './dashboard-snow-slider.component.css'
})
export class DashboardSnowSliderComponent implements OnInit {

  coverImages$!: Observable<ModsnowImg[]>;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.coverImages$ = this.apiService.getModsnowDynamics()
  }

}
