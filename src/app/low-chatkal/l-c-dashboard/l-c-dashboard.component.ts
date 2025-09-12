import {Component} from '@angular/core';
import {CardWrapperComponent} from "../../shared/component/card-wrapper/card-wrapper.component";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";

@Component({
  selector: 'app-l-c-dashboard',
  standalone: true,
  imports: [
    CardWrapperComponent,
    CardHeaderComponent
  ],
  templateUrl: './l-c-dashboard.component.html',
  styleUrl: './l-c-dashboard.component.css'
})
export class LCDashboardComponent {

}
