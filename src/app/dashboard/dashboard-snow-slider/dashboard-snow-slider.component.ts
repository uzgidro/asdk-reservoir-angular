import {Component, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {SharedModule} from "primeng/api";
import {ModsnowService} from "../../service/modsnow.service";
import {ModsnowImageResponse} from "../../shared/response/modsnow-response";

@Component({
  selector: 'app-dashboard-snow-slider',
  standalone: true,
  imports: [
    CarouselModule,
    SharedModule
  ],
  templateUrl: './dashboard-snow-slider.component.html',
  styleUrl: './dashboard-snow-slider.component.css'
})
export class DashboardSnowSliderComponent implements OnInit {

  rivers: ModsnowImageResponse[] = []

  constructor(private modsnow: ModsnowService) {
  }

  ngOnInit() {
    this.modsnow.getCover().subscribe({
      next: data => {this.rivers = data},
    })
  }

}
