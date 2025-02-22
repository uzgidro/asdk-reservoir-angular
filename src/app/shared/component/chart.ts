import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {isPlatformBrowser} from "@angular/common";
import {Directive, Inject, NgZone, PLATFORM_ID} from "@angular/core";
import {DateChart} from "../struct/chart";

@Directive()
export class Chart {
  private root!: am5.Root

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) {
  }

  private browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  protected renderHourChart(id: string, data: DateChart) {
    this.browserOnly(() => this.createHourChart(id, data))
  }

  protected updateHourChart(data: DateChart) {
    this.browserOnly(() => {
      if (!this.root) return;

      const chart = this.root.container.children.getIndex(0) as am5xy.XYChart;
      const series = chart.series.getIndex(0) as am5xy.LineSeries;

      if (series) {
        series.data.setAll(data.data);
        series.appear(1000);
      }
    })
  }

  protected chartDispose() {
    if (this.root != undefined) {
      this.browserOnly(() => this.root.dispose())
    }
  }

  private createHourChart(id: string, data: DateChart) {
    let root = am5.Root.new(id);
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
      tooltip: am5.Tooltip.new(root, {
        labelText: '{valueY}'
      })
    }));

    if (data.color) {
      series.set('stroke', am5.color(data.color))
    }

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

  // protected updateChart(data: ClusterChartData[]) {
  //   if (!this.root) return;
  //
  //   const chart = this.root.container.children.getIndex(0) as am5xy.XYChart;
  //   const seriesCount = chart.series.length;
  //   if (seriesCount === 0) return;
  //   for (let i = 0; i < seriesCount; i++) {
  //     const series = chart.series.getIndex(i) as am5xy.LineSeries;
  //
  //     if (series) {
  //       series.data.setAll(data);
  //       series.appear(1000);
  //     }
  //   }
  // }
}
