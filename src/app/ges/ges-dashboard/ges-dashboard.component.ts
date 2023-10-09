import {Component, OnInit} from '@angular/core';
import {TimeService} from "../../shared/service/time.service";
import {GesService} from "../shared/service/ges.service";

@Component({
  selector: 'app-ges-dashboard',
  templateUrl: './ges-dashboard.component.html',
  styleUrls: ['./ges-dashboard.component.css']
})
export class GesDashboardComponent implements OnInit{

  protected readonly Math = Math;
  currentTime?: Date

  constructor(private _timeService: TimeService,
              public _gesService: GesService) {
  }

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000*60*20);
  }

  private updateTime() {
    this._timeService.getCurrentTime().subscribe((data: any) => {
      this.currentTime = data.datetime;
    });
  }
}
