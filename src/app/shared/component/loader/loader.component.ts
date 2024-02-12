import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  @Input() size: 'xs' | 'sm' | 'm' | 'lg' | 'xl' | '2xl' | '3xl' = 'm'
}
