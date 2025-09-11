import { Component } from '@angular/core';
import {VideoWrapperComponent} from "../shared/component/video-wrapper/video-wrapper.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-low-chatkal',
  standalone: true,
  imports: [
    VideoWrapperComponent,
    RouterOutlet
  ],
  templateUrl: './low-chatkal.component.html',
  styleUrl: './low-chatkal.component.css'
})
export class LowChatkalComponent {

}
