import {Component} from '@angular/core';
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {CardWrapperComponent} from "../../shared/component/card-wrapper/card-wrapper.component";

@Component({
  selector: 'app-hydro-indicator',
  standalone: true,
  imports: [
    CardHeaderComponent,
    CardWrapperComponent
  ],
  templateUrl: './hydro-indicator.component.html',
  styleUrl: './hydro-indicator.component.css'
})
export class HydroIndicatorComponent {

}
