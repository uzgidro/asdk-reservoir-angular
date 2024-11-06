import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.css'
})
export class CardHeaderComponent {
  @Input() public title: string | undefined;
}
