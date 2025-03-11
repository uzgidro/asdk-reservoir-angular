import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {isPlatformBrowser} from "@angular/common";
import {Directive, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID} from "@angular/core";
import {CategoryChart, CategoryData, DateChart, Options} from "../struct/chart";
import {TimeUnit} from "@amcharts/amcharts5/.internal/core/util/Time";

@Directive()
export class Chart implements OnInit, OnDestroy {
  private root!: am5.Root
  protected id!: string

  constructor(@Inject(PLATFORM_ID) private platformId: Object, protected zone: NgZone) {
  }

  ngOnInit() {
    this.id = Math.floor(new Date().getTime() * Math.random()).toString()
  }

  ngOnDestroy() {
    this.chartDispose()
  }

  private browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  protected renderDateChart(data?: DateChart[], options?: Options) {
    this.browserOnly(() => this.createDateChart(this.id, data, options))
  }

  protected renderCategoryChart(data: CategoryChart[], options?: Options) {
    this.browserOnly(() => this.createCategoryChart(this.id, data, options))
  }

  protected updateDateChart(data: DateChart[]) {
    this.browserOnly(() => {
      if (!this.root) return;

      const chart = this.root.container.children.getIndex(0) as am5xy.XYChart;
      const seriesCount = chart.series.length;
      if (seriesCount === 0) return;
      for (let i = 0; i < seriesCount; i++) {
        const series = chart.series.getIndex(i) as am5xy.SmoothedXLineSeries;

        if (series) {
          series.data.setAll(data[i].data.map(item => ({
            timestamp: item.timestamp,
            value: Math.round(item.value),
          })))
          series.appear(1000);
        }
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

  protected addDateSeries(data: DateChart[], options?: Options) {
    this.browserOnly(() => {
      if (!this.root) {
        console.warn("Root не инициализирован. Сначала вызовите createDateChart.");
        return;
      }

      const chart = this.root.container.children.getIndex(0) as am5xy.XYChart;
      if (!chart) {
        console.warn("Chart не найден.");
        return;
      }

      let xAxis = chart.xAxes.getIndex(0) as am5xy.DateAxis<am5xy.AxisRenderer> | undefined;

      if (!xAxis) {
        xAxis = chart.xAxes.push(am5xy.DateAxis.new(this.root, {
          maxDeviation: 1,
          baseInterval: this.setTimeStep(data),
          renderer: am5xy.AxisRendererX.new(this.root, {minorGridEnabled: true}),
          tooltip: am5.Tooltip.new(this.root, {}),
        }));

        xAxis.get("renderer").labels.template.setAll({fill: am5.color("#fff")});
        xAxis.data.setAll(data[0].data.map(item => ({
          timestamp: item.timestamp,
          value: Math.round(item.value),
        })));
      }

      const yAxis = chart.yAxes.getIndex(0) as am5xy.ValueAxis<am5xy.AxisRenderer> | undefined;
      if (!yAxis) {
        console.warn("yAxis не найден.");
        return;
      }

      let legend
      if (!options?.hideLegend) legend = this.createLegend(this.root, chart);


      data.forEach((item) => {
        let series = this.createDateSeries(this.root!, chart, xAxis!, yAxis, item);
        if (!options?.hideBullets) series.bullets.push(() => this.setupBullets(this.root, item.bulletColor))
      });

      this.setupLegend(chart, legend)
    })
  }

  protected removeSeries(seriesName: string) {
    this.browserOnly(() => {
      if (!this.root) return;

      const chart = this.root.container.children.getIndex(0) as am5xy.XYChart;
      if (!chart) {
        console.warn("Chart не найден.");
        return;
      }

      const chartForRemove = chart.series.values.find(item => item.get('name') == seriesName)
      if (chartForRemove) {
        chartForRemove.hide(1000).then(() => {
          // chart.series.removeValue(chartForRemove)
          // chartForRemove.dispose()
        })
      }
    })
  }

  protected clearSeries() {
    if (!this.root) {
      console.warn("Root не инициализирован. Сначала вызовите createDateChart.");
      return;
    }

    const chart = this.root.container.children.getIndex(0) as am5xy.XYChart;
    if (!chart) {
      console.warn("Chart не найден.");
      return;
    }

    // Проходим по всем сериям и удаляем их
    while (chart.series.length > 0) {
      const series = chart.series.getIndex(0); // Получаем первую серию
      if (series) {
        chart.series.removeValue(series); // Удаляем серию из графика
        series.dispose(); // Освобождаем ресурсы
      }
    }

    // Обновляем легенду, если она есть
    const legend = chart.children.values.find((child) => child instanceof am5.Legend) as am5.Legend | undefined;
    if (legend) {
      legend.data.setAll(chart.series.values); // Обновляем данные легенды
    }
  }

  private chartDispose() {
    if (this.root != undefined) {
      this.browserOnly(() => this.root.dispose())
    }
  }

  private createDateChart(id: string, data?: DateChart[], options?: Options) {
    const root = am5.Root.new(id);

    this.setupRoot(root)
    const chart = this.setupChart(root)
    this.setupCursor(root, chart)

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {
        pan: "zoom"
      })
    }));

    yAxis.get("renderer").labels.template.setAll({fill: am5.color("#fff")});

    let legend
    if (!options?.hideLegend) legend = this.createLegend(root, chart, options?.legendPosition)

    if (data) {
      let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 1,
        baseInterval: this.setTimeStep(data),
        renderer: am5xy.AxisRendererX.new(root, {minorGridEnabled: true}),
        tooltip: am5.Tooltip.new(root, {})
      }));
      xAxis.get("renderer").labels.template.setAll({fill: am5.color("#fff")});
      xAxis.data.setAll(data[0].data)
      data.forEach(item => {
        let series = this.createDateSeries(root, chart, xAxis, yAxis, item);
        if (!options?.hideBullets) series.bullets.push(() => this.setupBullets(root, item.bulletColor))
      })
    }


    chart.appear(1000, 100);
    this.setupLegend(chart, legend)
    this.root = root;
  }

  private createCategoryChart(id: string, data: CategoryChart[], options?: Options) {
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

    let legend
    if (!options?.hideLegend) legend = this.createLegend(root, chart, options?.legendPosition)

    for (let i = 0; i < clusterCount; i++) {
      const series = this.createColumnSeries(root, chart, xAxis, yAxis, data[0].data[i]);
      series.data.setAll(data.map(item => ({
        name: item.name,
        value: Math.round(item.data[i].value)
      })))
      series.appear(1000)
    }

    chart.appear(1000, 100);
    this.setupLegend(chart, legend)
    this.root = root
  }

  private createDateSeries(
    root: am5.Root,
    chart: am5xy.XYChart,
    xAxis: am5xy.DateAxis<am5xy.AxisRenderer>,
    yAxis: am5xy.ValueAxis<am5xy.AxisRenderer>,
    data: DateChart) {
    let series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
      name: data.seriesName,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "timestamp",
      tooltip: am5.Tooltip.new(root, {
        labelText: '{name}: {valueY}'
      }),
    }));
    if (data.color) {
      series.set('stroke', am5.color(data.color))
      series.get('tooltip')!.set('getFillFromSprite', false)
      series.get('tooltip')!.get('background')!.set('fill', am5.color(data.color))
    }
    series.strokes.template.setAll({strokeWidth: 3});
    series.data.setAll(data.data.map(item => {
      return {
        timestamp: item.timestamp,
        value: Math.round(item.value)
      }
    }));
    series.appear(1000)
    return series
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
      layout: root.verticalLayout,
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: false,
      paddingLeft: 0,
    }));
  }

  private setTimeStep(data: DateChart[]): { timeUnit: TimeUnit, count: number } {
    const milliseconds = Math.abs(data[0].data[1].timestamp - data[0].data[0].timestamp);

    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 28);
    const years = Math.floor(days / 365);

    if (seconds <= 1) {
      return {
        timeUnit: 'millisecond',
        count: milliseconds,
      }
    } else if (minutes <= 1) {
      return {
        timeUnit: 'second',
        count: seconds,
      }
    } else if (hours <= 1) {
      return {
        timeUnit: 'minute',
        count: minutes,
      }
    } else if (days <= 1) {
      return {
        timeUnit: 'hour',
        count: hours,
      }
    } else if (months <= 1) {
      return {
        timeUnit: 'day',
        count: days,
      }
    } else if (years <= 1) {
      return {
        timeUnit: 'month',
        count: months,
      }
    } else {
      return {
        timeUnit: 'year',
        count: years,
      }
    }
  }

  private setupCursor(root: am5.Root, chart: am5xy.XYChart) {
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);
    cursor.lineX.setAll({stroke: am5.color('#fff')});
  }

  private createLegend(root: am5.Root, chart: am5xy.XYChart, position: 'top' | 'bottom' = 'top') {
    let legend = chart.children.values.find((child) => child instanceof am5.Legend) as am5.Legend | undefined;

    if (!legend) {
      let legendParams = am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      });
      if (position == 'top') legend = chart.children.unshift(legendParams);
      else legend = chart.children.push(legendParams);
      legend.labels.template.setAll({fill: am5.color("#ffffff")});
    }
    return legend
    // legend.data.setAll(chart.series.values);
  }

  private setupLegend(chart: am5xy.XYChart, legend?: am5.Legend) {
    legend?.data.setAll(chart.series.values)
  }

  private setupBullets(root: am5.Root, bulletColor: string | undefined) {
    const fill = bulletColor ? am5.color(bulletColor) : am5.color('#fff');
    return am5.Bullet.new(root, {
      locationY: 1,
      sprite: am5.Label.new(root, {
        centerX: am5.p50,
        centerY: am5.p100,
        text: "{valueY}",
        fill: fill,
        populateText: true,
        // rotation: 315
      })
    });
  }
}
