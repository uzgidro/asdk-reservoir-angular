import {Component, OnInit} from '@angular/core';
import {TimeService} from "../shared/service/time.service";
import {GesService} from "../shared/service/ges.service";

@Component({
  selector: 'app-ges-dashboard',
  templateUrl: './ges-dashboard.component.html',
  styleUrls: ['./ges-dashboard.component.css']
})
export class GesDashboardComponent implements OnInit {

  currentTime?: Date
  private selectedTab?: string
  private ascSort: boolean = true

  constructor(private _timeService: TimeService,
              public _gesService: GesService) {
  }

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000 * 60 * 20);
  }

  sortByName(event: any) {
    this.isAscSort(event)
    this._gesService.sortByName(this.ascSort)
  }

  sortByActivePower(event: any) {
    this.isAscSort(event)
    this._gesService.sortByPower(this.ascSort)
  }

  private isAscSort(event: any) {
    const selected = event.target.textContent
    if (selected != this.selectedTab) {
      this.ascSort = true
    } else {
      this.ascSort = !this.ascSort
    }
    this.selectedTab = selected
  }

  private updateTime() {
    this._timeService.getCurrentTime().subscribe((data: any) => {
      this.currentTime = data.datetime;
    });
  }
}
