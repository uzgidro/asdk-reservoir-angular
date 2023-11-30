import {Component} from '@angular/core';

@Component({
  selector: 'app-reservoir',
  templateUrl: './reservoir.component.html',
  styleUrls: ['./reservoir.component.css']
})
export class ReservoirComponent {
  readonly HOURLY_CATEGORY = 1;
  readonly DAILY_CATEGORY = 2;

  selectedCategory: number = this.HOURLY_CATEGORY

  changeCategory(category: number) {
    this.selectedCategory = category
  }
}
