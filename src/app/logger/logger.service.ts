import {Injectable, Injector} from "@angular/core";
import {ComponentType, Overlay} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {LoggerRef} from "./logger-ref";
import {DialogConfig} from "@angular/cdk/dialog";
import {LOGGER_DATA} from "./logger-token";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(private overlay: Overlay, private injector: Injector) {
  }

  open<T>(component: ComponentType<T>, config?: DialogConfig) {
    const positionStrategy = this.overlay
      .position()
      .global()
      .bottom()
      .centerHorizontally();

    // Create the overlay with customizable options
    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: false,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel'
    });

    const loggerRef = new LoggerRef(overlayRef);

    const injector = Injector.create({
      parent: this.injector,
      providers: [{provide: LoggerRef, useValue: loggerRef},
        {provide: LOGGER_DATA, useValue: config?.data}]
    });

    // Attach component portal to the overlay
    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);

    return loggerRef;
  }
}
