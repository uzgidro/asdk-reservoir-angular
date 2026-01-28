import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-card-wrapper',
  imports: [],
  templateUrl: './card-wrapper.component.html',
  standalone: true,
  styleUrl: './card-wrapper.component.css'
})
export class CardWrapperComponent {
  @Input() fillHeight = false;

  @HostBinding('class.fill-height') get fillHeightClass() {
    return this.fillHeight;
  }
}
