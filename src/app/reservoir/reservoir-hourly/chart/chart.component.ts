import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  SimpleChanges
} from '@angular/core';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {isPlatformBrowser} from "@angular/common";
import {ChartData} from "../reservoir-hourly.component";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() chart!: ChartData;
  id!: string;
  private root!: am5.Root;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) {
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnInit() {
    this.id = Math.floor(new Date().getTime() * Math.random()).toString();
  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      this.renderCharts()
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chart'] && !changes['chart'].firstChange) {
      this.browserOnly(() => this.updateCharts());
    }
  }

  ngOnDestroy() {
    this.browserOnly(() => {
      this.root.dispose();
    });
  }

  private renderCharts() {
    if (!this.chart) return;
    this.createChart(this.chart);
  }

  private updateCharts() {
    if (!this.chart) return;
    this.updateChart(this.chart);
  }

  private createChart(data: ChartData) {
    let root = am5.Root.new(this.id);
    let step = new Date(data.data[1].timestamp).getHours() - new Date(data.data[0].timestamp).getHours()
    if (step < 0) step += 24

    root.setThemes([am5themes_Animated.new(root)]);
    root.interfaceColors.set("grid", am5.color('#fff'));

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      layout: root.verticalLayout,
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomY",
      pinchZoomX: false,
      paddingLeft: 0,
    }));

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);
    cursor.lineX.setAll({stroke: am5.color('#fff')});

    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 1,
      baseInterval: {
        timeUnit: "hour",
        count: step
      },
      renderer: am5xy.AxisRendererX.new(root, {minorGridEnabled: true}),
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {
        pan: "zoom"
      })
    }));

    xAxis.get("renderer").labels.template.setAll({fill: am5.color("#fff")});
    yAxis.get("renderer").labels.template.setAll({fill: am5.color("#fff")});

    xAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));

    let series = chart.series.push(am5xy.LineSeries.new(root, {
      name: data.name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "timestamp",
      stroke: am5.color(data.color),
      tooltip: am5.Tooltip.new(root, {
        labelText: '{valueY}'
      })
    }));

    series.strokes.template.setAll({strokeWidth: 3});

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          centerX: am5.p50,
          centerY: am5.p100,
          text: "{valueY}",
          fill: am5.color('#fff'),
          populateText: true,
          rotation: 315
        })
      });
    });

    xAxis.data.setAll(data.data)
    series.data.setAll(data.data);

    let legend = chart.children.unshift(am5.Legend.new(root, {
      x: am5.percent(60),
      centerX: am5.percent(60)
    }));
    legend.labels.template.setAll({fill: am5.color("#ffffff")});
    legend.data.setAll(chart.series.values);

    series.appear(1000)
    chart.appear(1000, 100);
  }

  private updateChart(data: ChartData) {
    if (!this.root) return;

    const chart = this.root.container.children.getIndex(0) as am5xy.XYChart;
    const series = chart.series.getIndex(0) as am5xy.LineSeries;

    if (series) {
      series.data.setAll(data.data);
    }
  }
}

