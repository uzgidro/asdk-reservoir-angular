import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-hydrometric',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './hydrometric.component.html',
  styleUrl: './hydrometric.component.css'
})
export class HydrometricComponent {

}
