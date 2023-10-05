import {Component, OnInit} from '@angular/core';
import {TimeService} from "../shared/service/time.service";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit{

  currentTime?: Date

  constructor(
    private _timeService: TimeService
  ) {}
  ngOnInit() {

    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  private updateTime() {
    this._timeService.getCurrentTime().subscribe((data: any) => {
      this.currentTime = data.datetime;
    });
  }
}
