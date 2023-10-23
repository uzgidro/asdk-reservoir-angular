import {Component, OnInit} from '@angular/core';
import {TimeService} from "../../service/time.service";
import {LoggerService} from "../../../logger/logger.service";
import {LoggerComponent} from "../../../logger/component/logger.component";
import {LoggerRef} from "../../../logger/logger-ref";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentTime?: Date
  loggerRef?: LoggerRef

  constructor(public _timeService: TimeService, private loggerService: LoggerService) {
  }

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  openLogger() {
    if (this.loggerRef != undefined) {
      this.loggerRef.close()
      this.loggerRef = undefined
    } else {
      this.loggerRef = this.loggerService.open(LoggerComponent);
    }
  }

  private updateTime() {
    this._timeService.getCurrentTime().subscribe((data: any) => {
      this.currentTime = data.datetime;
    });
  }
}
