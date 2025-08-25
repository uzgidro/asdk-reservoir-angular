import {Component} from '@angular/core';
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {CardWrapperComponent} from "../../shared/component/card-wrapper/card-wrapper.component";

@Component({
    selector: 'app-hydro-works',
    templateUrl: './hydro-works.component.html',
    styleUrl: './hydro-works.component.css',
  imports: [
    CardHeaderComponent,
    CardWrapperComponent
  ],
    standalone: true
})
export class HydroWorksComponent {

}
