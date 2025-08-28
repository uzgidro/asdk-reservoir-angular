import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-hydrometer',
    imports: [
        RouterOutlet
    ],
  standalone: true,
    templateUrl: './hydrometer.component.html',
    styleUrl: './hydrometer.component.css'
})
export class HydrometerComponent {

}
