import {Component, OnInit} from '@angular/core';
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {ApiService} from "../../service/api.service";
import {WeatherDetailedFrameComponent} from "../../shared/component/wearher-detailed/weather-detailed-frame.component";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrl: './weather.component.css',
    imports: [
        WeatherDetailedFrameComponent,
        NgForOf
    ],
  standalone: true,
})
export class WeatherComponent implements OnInit {
  // selectedReservoir?: RegionInfo
  reservoirs?: ReservoirResponse[]
  date?: Date

  constructor(
    private api: ApiService,
    // private router: Router,
    // private activatedRoute: ActivatedRoute,
    // private env: EnvService,
    // private resService: ReservoirService
  ) {
  }

  ngOnInit() {
    this.api.getReservoirs().subscribe({
      next: (response: ReservoirResponse[]) => {
        this.reservoirs = response
      }
    })
    // this.activatedRoute.queryParams.subscribe({
    //   next: value => {
    //     // this.selectedReservoir = this.resService.setReservoir(value, this.env.getRegions())
    //     this.date = new Date()
    //     if (!this.selectedReservoir) {
    //       this.reservoirs = this.env.getRegions()
    //     }
    //   }
    // })
  }

  // select(resId: string) {
  //   this.router.navigate([], {
  //     relativeTo: this.activatedRoute,
  //     queryParams: {reservoir: resId},
  //     queryParamsHandling: 'merge'
  //   });
  // }
}
