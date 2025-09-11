import {Component} from '@angular/core';
import {VideoWrapperComponent} from "../shared/component/video-wrapper/video-wrapper.component";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../shared/component/navbar/navbar.component";

@Component({
  selector: 'app-low-chatkal',
  standalone: true,
  imports: [
    VideoWrapperComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavbarComponent
  ],
  templateUrl: './low-chatkal.component.html',
  styleUrl: './low-chatkal.component.css'
})
export class LowChatkalComponent {

}
