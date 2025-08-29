import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  imports: [
    NgClass
  ],
  standalone: true,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  @Input() size: 'xs' | 'sm' | 'm' | 'lg' | 'xl' | '2xl' | '3xl' = 'm'
}
