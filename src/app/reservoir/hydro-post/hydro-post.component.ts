import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-hydro-post',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './hydro-post.component.html',
  styleUrl: './hydro-post.component.css'
})
export class HydroPostComponent {

}
