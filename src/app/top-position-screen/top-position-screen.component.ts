import {Component} from '@angular/core';
import {ReservoirMapComponent} from "../reservoir/reservoir-map/reservoir-map.component";
import {OperativeTableComponent} from "../reservoir/reservoir-hourly/operative-table/operative-table.component";

@Component({
    selector: 'app-top-position-screen',
    imports: [
        ReservoirMapComponent,
        OperativeTableComponent
    ],
    templateUrl: './top-position-screen.component.html',
    styleUrl: './top-position-screen.component.css'
})
export class TopPositionScreenComponent {

}
