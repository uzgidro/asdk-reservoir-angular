import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {NgChartsModule} from "ng2-charts";
import {ApiService} from "../../service/api.service";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {WeatherDetailedFrameComponent} from "../../shared/component/wearher-detailed/weather-detailed-frame.component";
import {WaterRecourseCardComponent} from "../../water-recourses/water-recourse-card/water-recourse-card.component";
import {ReservoirData} from "../../shared/interface/reservoir-data";
import {ResourceService} from "../../service/resource.service";

@Component({
  selector: 'app-custom-dashboard',
  standalone: true,
  imports: [
    CardHeaderComponent,
    NgChartsModule,
    WeatherDetailedFrameComponent,
    WaterRecourseCardComponent
  ],
  templateUrl: './custom-dashboard.component.html',
  styleUrl: './custom-dashboard.component.css'
})
export class CustomDashboardComponent implements OnInit {
  exactReservoir: '' | 'hisorak' = '';
  reservoir?: ReservoirResponse;
  reservoirData?: ReservoirData;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private resourceService: ResourceService) {
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

    this.api.getDashboardValuesSortedByReservoir().subscribe(array => {
      let find = array.find(value => value.reservoir.name.toLowerCase() == this.exactReservoir.toLowerCase());
      if (find) {
        this.reservoirData = this.resourceService.parseResponse(find);
      }
    });

    this.api.getReservoirs().subscribe({
      next: (response: ReservoirResponse[]) => {
        this.reservoir = response.find(value => value.name.toLowerCase() === this.exactReservoir.toLowerCase());
        console.log(this.reservoir);
      }
    })
  }
}
