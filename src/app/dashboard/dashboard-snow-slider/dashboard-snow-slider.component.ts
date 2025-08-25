import {Component, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {SharedModule} from "primeng/api";
import {ApiService} from "../../service/api.service";
import {Observable} from "rxjs";
import {ModsnowImg} from "../../shared/interfaces";
import {LoaderComponent} from "../../shared/component/loader/loader.component";

@Component({
  selector: 'app-dashboard-snow-slider',
  standalone: true,
  imports: [
    CarouselModule,
    SharedModule,
    LoaderComponent
  ],
  templateUrl: './dashboard-snow-slider.component.html',
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
