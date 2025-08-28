import {Component} from '@angular/core';
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {CardWrapperComponent} from "../../shared/component/card-wrapper/card-wrapper.component";

@Component({
    selector: 'app-hydro-meter',
    imports: [
        CardHeaderComponent,
        CardWrapperComponent
    ],
    templateUrl: './hydro-meter.component.html',
    styleUrl: './hydro-meter.component.css'
})
export class HydroMeterComponent {

}
