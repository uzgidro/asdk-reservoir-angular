import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TimeService} from "../../service/time.service";
import {LoggerService} from "../../../logger/logger.service";
import {LoggerComponent} from "../../../logger/component/logger.component";
import {LoggerRef} from "../../../logger/logger-ref";
import {Subscription} from "rxjs";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    imports: [
        RouterLink,
        RouterLinkActive,
        DatePipe
    ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() sidebarEmitter = new EventEmitter();
  currentTime?: Date
  loggerRef?: LoggerRef
  private subscription?: Subscription;

  constructor(public _timeService: TimeService, private loggerService: LoggerService) {
  }

  ngOnInit() {
    this.subscription = this._timeService.getCurrentTimeSecond().subscribe(
      (data: any) => this.currentTime = data
    );
  }

  openSidebar() {
    this.sidebarEmitter.emit();
  }

  openLogger() {
    if (this.loggerRef != undefined) {
      this.loggerRef.close()
      this.loggerRef = undefined
    } else {
      this.loggerRef = this.loggerService.open(LoggerComponent)
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
