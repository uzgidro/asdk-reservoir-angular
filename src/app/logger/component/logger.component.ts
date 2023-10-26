import { Component } from '@angular/core';
import {LoggerRef} from "../logger-ref";
import {ResizeEvent} from "angular-resizable-element";

@Component({
  selector: 'app-component',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent {

  windowHeight: string = ''

  constructor(private loggerRef: LoggerRef) {}

  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event.rectangle.height);
    this.windowHeight = `height: ${event.rectangle.height}px`
  }

  close() {
    this.loggerRef.close();
  }
}
