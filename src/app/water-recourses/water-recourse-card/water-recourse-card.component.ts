import {AfterViewInit, Component, Inject, Input, NgZone, OnInit, PLATFORM_ID} from '@angular/core';
import {DecimalPipe, isPlatformBrowser, NgClass, NgIf, TitleCasePipe} from "@angular/common";
import {NgChartsModule} from "ng2-charts";
import {RouterLink} from "@angular/router";
import {UzbWeatherPipe} from "../../shared/pipe/uzb-weather.pipe";
import {ChartData} from "../../reservoir/reservoir-hourly/reservoir-hourly.component";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-water-recourse-card',
  standalone: true,
  imports: [
    DecimalPipe,
    NgChartsModule,
    NgIf,
    RouterLink,
    TitleCasePipe,
    UzbWeatherPipe,
    NgClass
  ],
  templateUrl: './water-recourse-card.component.html',
  styleUrl: './water-recourse-card.component.css'
})
export class WaterRecourseCardComponent implements OnInit, AfterViewInit {
  @Input() data!: {
    reservoirId: number;
    reservoir: string
    income: number
    incomeDifference: string
    incomeChart: ChartData
    release: number
    releaseDifference: string
    releaseChart: ChartData
    level: number
    levelDifference: string
    levelChart: ChartData
    volume: number
    volumeDifference: string
    volumeChart: ChartData
    incomeLabels: string[]
    releaseLabels: string[]
    levelLabels: string[]
    volumeLabels: string[]
    weather?: string
    temperature?: string
    windSpeed?: number
    humidity?: string
  }
  id!: string;
  private root!: am5.Root;

  public category: 'income' | 'release' | 'volume' | 'level' = 'income'

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
    this.browserOnly(() => this.createChart(this.data.incomeChart))
  }

  changeCategory(category: 'income' | 'release' | 'volume' | 'level') {
    this.category = category

    switch (this.category) {
      case 'income': {
        this.updateChart(this.data.incomeChart)
        break
      }
      case 'release': {
        this.updateChart(this.data.releaseChart)
        break
      }
      case 'level': {
        this.updateChart(this.data.levelChart)
        break
      }
      case 'volume': {
        this.updateChart(this.data.volumeChart)
        break
      }
    }
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
      // stroke: data.color ?  am5.color(data.color) : ,
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
          // rotation: 315
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
    this.root = root;
  }

  private updateChart(data: ChartData) {
    if (!this.root) return;

    const chart = this.root.container.children.getIndex(0) as am5xy.XYChart;
    const series = chart.series.getIndex(0) as am5xy.LineSeries;

    if (series) {
      series.data.setAll(data.data);
      series.appear(1000);
    }
  }
}
