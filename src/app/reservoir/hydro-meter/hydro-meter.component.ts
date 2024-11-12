import {Component} from '@angular/core';
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";

@Component({
  selector: 'app-hydro-meter',
  standalone: true,
  imports: [
    CardHeaderComponent
  ],
  templateUrl: './hydro-meter.component.html',
  styleUrl: './hydro-meter.component.css'
})
export class HydroMeterComponent {

}
