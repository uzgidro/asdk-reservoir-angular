import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {DatePipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {NgChartsModule} from "ng2-charts";
import {ApiService} from "../../service/api.service";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {WeatherDetailedFrameComponent} from "../../shared/component/wearher-detailed/weather-detailed-frame.component";

@Component({
  selector: 'app-custom-dashboard',
  standalone: true,
  imports: [
    CardHeaderComponent,
    DatePipe,
    NgChartsModule,
    NgForOf,
    NgOptimizedImage,
    WeatherDetailedFrameComponent
  ],
  templateUrl: './custom-dashboard.component.html',
  styleUrl: './custom-dashboard.component.css'
})
export class CustomDashboardComponent implements OnInit {
  exactReservoir: '' | 'hisorak' = '';
  reservoir?: ReservoirResponse;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService,) {
  }

  ngOnInit() {
    let urlParam = this.activatedRoute.parent?.snapshot.paramMap.get('reservoir');
    if (urlParam != undefined) {
      if (urlParam == 'hisorak') {
        this.exactReservoir = urlParam
      } else {
        this.router.navigate(['']);
      }
    }

    this.api.getReservoirs().subscribe({
      next: (response: ReservoirResponse[]) => {
        this.reservoir = response.find(value => value.name.toLowerCase() === this.exactReservoir.toLowerCase());
        console.log(this.reservoir);
      }
    })
  }
}
