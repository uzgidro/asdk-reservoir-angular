import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EnvService} from "../../shared/service/env.service";
import {ReservoirService} from "../reservoir.service";
import {RegionInfo} from "../../../environments/environment.development";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  selectedReservoir?: RegionInfo
  reservoirs?: RegionInfo[]
  date?: Date

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private env: EnvService, private resService: ReservoirService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        // this.selectedReservoir = this.resService.setReservoir(value, this.env.getRegions())
        this.date = new Date()
        if (!this.selectedReservoir) {
          this.reservoirs = this.env.getRegions()
        }
      }
    })
  }

  select(resId: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {reservoir: resId},
      queryParamsHandling: 'merge'
    });
  }
}
