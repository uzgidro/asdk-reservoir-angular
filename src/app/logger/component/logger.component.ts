import {Component} from '@angular/core';
import {LoggerRef} from "../logger-ref";
import {ResizeEvent} from "angular-resizable-element";

@Component({
  selector: 'app-component',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent {

  windowHeight: string = ''

  constructor(private loggerRef: LoggerRef) {
  }

  onResizeEnd(event: ResizeEvent): void {
    let height = event.rectangle.height
    console.log(height)
    if (height!! >= 150) {
      this.windowHeight = `height: 150px`
    } else if (height!! <= 45) {
      this.windowHeight = `height: 45px`
    } else {
      this.windowHeight = `height: ${event.rectangle.height}px`
    }
  }

  close() {
    this.loggerRef.close();
  }
}
