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
  private ascSort?: boolean

  constructor(private _timeService: TimeService,
              public _gesService: GesService) {
  }

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000 * 60 * 20);
  }

  sortByName(event: any, thead: any) {
    this.resetArrow(event, thead)
    this.isAscSort(event)
    this._gesService.sortByName(this.ascSort!!)
  }

  sortByActivePower(event: any, thead: any) {
    this.resetArrow(event, thead)
    this.isAscSort(event)
    this._gesService.sortByPower(this.ascSort!!)
  }

  changeArrow(element: any) {
    if (this.ascSort) {
      element.data = '../../assets/icons/arrow_up.svg'
    } else {
      element.data = '../../assets/icons/arrow_down.svg'
    }
  }

  private resetArrow(event: any, thead: any) {
    if (this.selectedTab != event.target.firstChild.textContent) {
      // iterate children <th>
      for (const child of thead.children) {
        // check if sortable (cursor-pointer)
        if (child.classList.contains('cursor-pointer')) {
          // if svg is not 'arrows' -> set 'arrows'
          if (!child.lastChild.lastChild.data.includes('arrows.svg')) {
            child.lastChild.lastChild.data = '../../assets/icons/arrows.svg'
          }
        }
      }
    }
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
