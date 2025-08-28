import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {LevelVolume} from "../../shared/interfaces";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-reservoir-lv',
    imports: [
        NgForOf
    ],
    templateUrl: './reservoir-lv.component.html',
  styleUrl: './reservoir-lv.component.css',
  standalone: true,
})
export class ReservoirLvComponent implements OnInit {

  lvArrays: LevelVolume[][] = []

  private chunkSize: number = 10;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.lvArrays = []
        const reservoir = value['reservoir']
        this.api.getLv(reservoir).subscribe({
          next: (response: LevelVolume[]) => {
            for (let i = 0; i < response.length; i += this.chunkSize) {
              this.lvArrays.push(response.slice(i, i + this.chunkSize));
            }
          }
        })
      }
    })
  }
}
