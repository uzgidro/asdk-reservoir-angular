import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {ActivatedRoute} from "@angular/router";
import {CategorisedValueResponse} from "../../shared/response/values-response";
import {ReservoirResponse} from "../../shared/response/reservoir-response";
import {Subscription} from "rxjs";
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {DecadeService} from "../decade.service";
import {Decade} from "../../shared/interfaces";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {CardWrapperComponent} from "../../shared/component/card-wrapper/card-wrapper.component";

@Component({
  selector: 'app-reservoir-yearly',
  templateUrl: './reservoir-yearly.component.html',
  styleUrl: './reservoir-yearly.component.css',
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    DecimalPipe,
    DatePipe,
    CardHeaderComponent,
    CardWrapperComponent
  ],
  standalone: true

})
export class ReservoirYearlyComponent implements OnInit {
  reservoirName?: string
  subscribe?: Subscription
  category: number = 0

  tableData: Decade[] = []
  months: string[] = this.decadeService.months;
  decade: string[] = this.decadeService.decade;


  constructor(
    private api: ApiService,
    private decadeService: DecadeService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        const reservoir = value['reservoir']
        if (this.subscribe) {
          this.subscribe.unsubscribe()
          this.subscribe = undefined
          this.tableData = []
        }
        this.api.getReservoirById(reservoir).subscribe({
          next: (response: ReservoirResponse) => {
            this.reservoirName = response.name
          }
        })

        this.subscribe = this.api.getDecadeYearsValues(reservoir).subscribe({
          next: (response: CategorisedValueResponse) => {
            this.tableData.push(
              this.decadeService.setDecade('Kelishi, m³/s', response.income.data, false),
              this.decadeService.setDecade('Chiqish, m³/s', response.release.data, false),
              this.decadeService.setDecade('Suv sathi, m', response.level.data, false),
              this.decadeService.setDecade('Suv hajmi, mln.m³', response.volume.data, false),
            )
          }
        })
      }
    })
  }
}
