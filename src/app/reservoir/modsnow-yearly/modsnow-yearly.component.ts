import {Component, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {NgOptimizedImage} from "@angular/common";
import {SharedModule} from "primeng/api";
import {RegionInfo} from "../../../environments/environment.development";
import {ActivatedRoute} from "@angular/router";
import {EnvService} from "../../shared/service/env.service";
import {ReservoirService} from "../reservoir.service";
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-modsnow-yearly',
  standalone: true,
    imports: [
        CarouselModule,
        NgOptimizedImage,
        SharedModule
    ],
  templateUrl: './modsnow-yearly.component.html',
  styleUrl: './modsnow-yearly.component.css'
})
export class ModsnowYearlyComponent implements OnInit{
  reservoir?: RegionInfo

  constructor(private activatedRoute: ActivatedRoute, private env: EnvService, private resService: ReservoirService) {
  }

  ngOnInit() {
    Chart.register(...registerables);
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.reservoir = this.resService.setReservoir(value, this.env.getRegions())
      }
    })
  }


  }
