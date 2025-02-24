import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {isPlatformBrowser} from "@angular/common";
import {Directive, Inject, NgZone, PLATFORM_ID} from "@angular/core";
import {CategoryChart, CategoryData, DateChart} from "../struct/chart";

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

  protected renderCategoryChart(id: string, data: CategoryChart[], showLegend: boolean = true) {
    this.browserOnly(() => this.createCategoryChart(id, data, showLegend))
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

  protected updateCategoryChart(data: CategoryChart[]) {
    this.browserOnly(() => {
      if (!this.root) return;

      const chart = this.root.container.children.getIndex(0) as am5xy.XYChart;
      const seriesCount = chart.series.length;
      if (seriesCount === 0) return;
      for (let i = 0; i < seriesCount; i++) {
        const series = chart.series.getIndex(i) as am5xy.LineSeries;

        if (series) {
          series.data.setAll(data.map(item => ({
            name: item.name,
            value: item.data[i].value
          })))
          series.appear(1000);
        }
      }
    })
  }

  protected chartDispose() {
    if (this.root != undefined) {
      this.browserOnly(() => this.root.dispose())
    }
  }

  private createHourChart(id: string, data: DateChart) {
    const root = am5.Root.new(id);
    let step = new Date(data.data[1].timestamp).getHours() - new Date(data.data[0].timestamp).getHours()
    if (step < 0) step += 24

    this.setupRoot(root)
    const chart = this.setupChart(root)
    this.setupCursor(root, chart)

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

    xAxis.data.setAll(data.data)

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

    series.bullets.push(() => this.setupBullets(root, data.bulletColor))

    series.data.setAll(data.data);

    this.setupLegend(root, chart)

    series.appear(1000)
    chart.appear(1000, 100);
    this.root = root;
  }

  private createCategoryChart(id: string, data: CategoryChart[], showLegend: boolean = true) {
    let root = am5.Root.new(id);

    this.setupRoot(root);
    let chart = this.setupChart(root)
    this.setupCursor(root, chart)

    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true
    });

    xRenderer.labels.template.setAll({
      rotation: 0,
      centerY: am5.p50,
      centerX: am5.p50,
      paddingRight: 0
    });

    xRenderer.grid.template.setAll({
      location: 1
    })

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: "name",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1
    })

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      renderer: yRenderer
    }));

    xAxis.get("renderer").labels.template.setAll({fill: am5.color("#fff")});
    yAxis.get("renderer").labels.template.setAll({fill: am5.color("#fff")});

    xAxis.data.setAll(data);


    let clusterCount = data[0].data.length

    for (let i = 0; i < clusterCount; i++) {
      const series = this.createColumnSeries(root, chart, xAxis, yAxis, data[0].data[i]);
      series.data.setAll(data.map(item => ({
        name: item.name,
        value: item.data[i].value
      })))
      series.appear(1000)
    }
    if (showLegend) this.setupLegend(root, chart)

    chart.appear(1000, 100);
    this.root = root
  }

  private createColumnSeries(
    root: am5.Root,
    chart: am5xy.XYChart,
    xAxis: am5xy.CategoryAxis<am5xy.AxisRenderer>,
    yAxis: am5xy.ValueAxis<am5xy.AxisRenderer>,
    data: CategoryData
  ) {
    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: data.seriesName,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      sequencedInterpolation: true,
      categoryXField: "name",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    series.bullets.push(() => this.setupBullets(root, data.bulletColor));
    series.columns.template.setAll({cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0});
    if (data.color) series.columns.template.set('fill', am5.color(data.color));

    return series
  }

  private setupRoot(root: am5.Root) {
    root.setThemes([am5themes_Animated.new(root)]);
    root.interfaceColors.set("grid", am5.color('#fff'));
  }

  private setupChart(root: am5.Root) {
    return root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: false,
      paddingLeft: 0,
    }));
  }

  private setupCursor(root: am5.Root, chart: am5xy.XYChart) {
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);
    cursor.lineX.setAll({stroke: am5.color('#fff')});
  }

  private setupLegend(root: am5.Root, chart: am5xy.XYChart) {
    let legend = chart.children.unshift(am5.Legend.new(root, {
      x: am5.percent(60),
      centerX: am5.percent(60),
      centerY: am5.p0,
    }));
    legend.labels.template.setAll({fill: am5.color("#ffffff")});
    legend.data.setAll(chart.series.values);
    console.log(chart.series.values);
  }

  private setupBullets(root: am5.Root, bulletColor: string | undefined) {
    const fill = bulletColor ? am5.color(bulletColor) : am5.color('#fff');
    return am5.Bullet.new(root, {
      locationY: 1,
      sprite: am5.Label.new(root, {
        centerX: am5.p50,
        // centerY: am5.p100,
        text: "{valueY}",
        fill: fill,
        populateText: true,
        // rotation: 315
      })
    });
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
