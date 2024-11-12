import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";

@Component({
  selector: 'app-hydro-post',
  standalone: true,
  imports: [
    NgForOf,
    CardHeaderComponent
  ],
  templateUrl: './hydro-post.component.html',
  styleUrl: './hydro-post.component.css'
})
export class HydroPostComponent {

}
