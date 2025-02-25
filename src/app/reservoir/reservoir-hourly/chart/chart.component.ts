import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
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
  implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() chart!: DateChart;
  id!: string;

  ngOnInit() {
    this.id = Math.floor(new Date().getTime() * Math.random()).toString();
  }

  ngAfterViewInit() {
    this.renderHourChart(this.id, [this.chart])
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chart'] && !changes['chart'].firstChange) {
      this.updateHourChart(this.chart)
    }
  }

  ngOnDestroy() {
    this.chartDispose()
  }
}

