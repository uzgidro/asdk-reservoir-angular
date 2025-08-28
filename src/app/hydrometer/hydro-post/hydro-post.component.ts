import {Component} from '@angular/core';
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {CardWrapperComponent} from "../../shared/component/card-wrapper/card-wrapper.component";

@Component({
    selector: 'app-hydro-post',
    imports: [
        CardHeaderComponent,
        CardWrapperComponent
    ],
    templateUrl: './hydro-post.component.html',
    styleUrl: './hydro-post.component.css'
})
export class HydroPostComponent {

}
