import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimeService} from "../../service/time.service";
import {Subscription} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    DatePipe
  ],
  standalone: true,
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentTime?: Date
  private subscription?: Subscription;

  constructor(public _timeService: TimeService) {
  }

  ngOnInit() {
    this.subscription = this._timeService.getCurrentTimeSecond().subscribe(
      (data: any) => this.currentTime = data
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
