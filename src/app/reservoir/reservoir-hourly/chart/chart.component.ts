import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Chart} from "../../../shared/component/chart";
import {DateChart} from "../../../shared/struct/chart";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent
  extends Chart
  implements AfterViewInit, OnChanges {
  @Input() chart!: DateChart;

  ngAfterViewInit() {
    this.renderDateChart([this.chart])
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chart'] && !changes['chart'].firstChange) {
      this.updateHourChart(this.chart)
    }
  }
}

