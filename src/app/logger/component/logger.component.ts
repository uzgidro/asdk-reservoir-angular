import { Component } from '@angular/core';
import {LoggerRef} from "../logger-ref";

@Component({
  selector: 'app-component',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent {
  constructor(private loggerRef: LoggerRef) {}

  close() {
    this.loggerRef.close();
  }
}
