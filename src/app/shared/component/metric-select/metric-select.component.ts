import {Component, EventEmitter, Output} from '@angular/core';
import {NgClass} from "@angular/common";
import {MetricCategory} from "../../enum/metric-category";

@Component({
  selector: 'app-metric-select',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './metric-select.component.html',
  styleUrl: './metric-select.component.css'
})
export class MetricSelectComponent {
  category: MetricCategory = MetricCategory.SPEED
  @Output() categoryEmitter = new EventEmitter<MetricCategory>()

  changeMetrics(cat: MetricCategory) {
    if (this.category !== cat) {
      this.category = cat
      this.categoryEmitter.emit(this.category)
    }
  }

  protected readonly MetricCategory = MetricCategory;
}
