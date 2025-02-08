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

  // Функция для работы только в браузере
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

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      layout: root.verticalLayout,
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      pinchZoomX: false,
      paddingLeft: 0,
    }));

    // Курсор
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);
    cursor.lineX.setAll({stroke: am5.color('#fff')});

    // Ось X (даты)
    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0,
      baseInterval: {timeUnit: "hour", count: 6},
      renderer: am5xy.AxisRendererX.new(root, {minorGridEnabled: true}),
      tooltip: am5.Tooltip.new(root, {})
    }));

    // Ось Y (значения)
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    // Создаем серию данных
    let series = chart.series.push(am5xy.LineSeries.new(root, {
      name: data.name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "timestamp",
      stroke: am5.color(data.color),
      tooltip: am5.Tooltip.new(root, {})
    }));

    // Делаем линию толще
    series.strokes.template.setAll({strokeWidth: 3});

    // Устанавливаем данные
    series.data.setAll(data.data);

    // Настройка цветов осей
    root.interfaceColors.set("grid", am5.color('#fff'));
    xAxis.get("renderer").labels.template.setAll({fill: am5.color("#fff")});
    yAxis.get("renderer").labels.template.setAll({fill: am5.color("#fff")});

    xAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));

    // Легенда
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

