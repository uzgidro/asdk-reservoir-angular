import {Component, NgZone, OnInit} from '@angular/core';
import {DropDownAnimation, SideMenuAnimation} from "../shared/animation/menu-animation";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {ApiService} from "../service/api.service";
import {ReservoirResponse} from "../shared/response/reservoir-response";
import {NgClass, NgForOf} from "@angular/common";
import {BrodacastService} from "../service/brodacast.service";

@Component({
    selector: 'app-reservoir',
    templateUrl: './reservoir.component.html',
    styleUrls: ['./reservoir.component.css'],
    animations: [DropDownAnimation, SideMenuAnimation],
    imports: [
        RouterOutlet,
        NgForOf,
        NgClass,
    ]
})
export class ReservoirComponent implements OnInit {
  reservoirs: { id: number, name: string }[] = []
  selectedReservoirId: number = 0

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private api: ApiService, private broadcast: BrodacastService, private zone: NgZone) {
  }

  ngOnInit() {
    this.api.getReservoirs().subscribe({
      next: (response: ReservoirResponse[]) => {
        this.reservoirs = response
      }
    })

    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.selectedReservoirId = value['reservoir']
      }
    })

    this.broadcast.reservoir.subscribe({
      next: value => {
        this.zone.run(() => {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {reservoir: value},
            queryParamsHandling: 'merge', // Сохраняем существующие queryParams
          });
        })
      }
    })
  }

  changeReservoir(id: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {reservoir: id},
      queryParamsHandling: 'merge'
    })
  }
}
