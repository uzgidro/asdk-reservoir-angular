import {AfterViewInit, Component, Inject, NgZone, OnDestroy, PLATFORM_ID} from '@angular/core';
import {NgChartsModule} from "ng2-charts";
import {RouterLink} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {CategorisedArrayResponse, ComplexValueResponse} from "../../shared/response/values-response";
import {isPlatformBrowser, NgClass} from "@angular/common";

import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";

@Component({
  selector: 'app-dashboard-current-chart',
  standalone: true,
  imports: [
    NgChartsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './dashboard-current-chart.component.html',
  styleUrl: './dashboard-current-chart.component.css'
})
export class DashboardCurrentChartComponent implements AfterViewInit, OnDestroy {
  public category: 'income' | 'release' | 'volume' | 'level' = 'income';

  private root!: am5.Root;
  private incomeData!: ChartData[]
  private releaseData!: ChartData[]
  private volumeData!: ChartData[]
  private levelData!: ChartData[]
  private currentTime!: string
  private dayBegin = '06:00'

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone, private apiService: ApiService) {
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      this.apiService.getDashboardValues().subscribe({
        next: (response: CategorisedArrayResponse) => {
          this.incomeData = this.setupData(response.income)
          this.releaseData = this.setupData(response.release)
          this.levelData = this.setupData(response.level)
          this.volumeData = this.setupData(response.volume)
          this.setupChart(this.incomeData)
        }
      })
    })
  }

  ngOnDestroy() {
    if (this.root != undefined) {
      this.root.dispose()
    }
  }

  public changeCategory(category: 'income' | 'release' | 'volume' | 'level'): void {
    this.category = category
    switch (category) {
      case "income": {
        this.updateChart(this.incomeData)
        break
      }
      case "release": {
        this.updateChart(this.releaseData)
        break
      }
      case "level": {
        this.updateChart(this.levelData)
        break
      }
      case "volume": {
        this.updateChart(this.volumeData)
        break
      }
    }
  }

  private setupChart(data: ChartData[]) {
    let root = am5.Root.new("dashboardChart");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    root.interfaceColors.set("grid", am5.color('#fff'));

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft: 0,
    }));

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);
    cursor.lineX.setAll({stroke: am5.color('#fff')});


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

    let dayBeginSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: this.dayBegin,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "dayBeginValue",
      sequencedInterpolation: true,
      categoryXField: "name",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    dayBeginSeries.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Label.new(root, {
          centerX: am5.p50,
          // centerY: am5.p100,
          text: "{valueY}",
          fill: am5.color('#4eeefe'),
          populateText: true,
          // rotation: 315
        })
      });
    });

    let currentSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: this.currentTime,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "currentValue",
      sequencedInterpolation: true,
      categoryXField: "name",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    currentSeries.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Label.new(root, {
          centerX: am5.p50,
          // centerY: am5.p100,
          text: "{valueY}",
          fill: am5.color('#014a67'),
          populateText: true,
          // rotation: 315
        })
      });
    });

    dayBeginSeries.columns.template.setAll({cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0});
    dayBeginSeries.columns.template.set('fill', am5.color('#014a67'));

    dayBeginSeries.data.setAll(data);

    currentSeries.columns.template.setAll({cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0});
    currentSeries.columns.template.set('fill', am5.color('#4eeefe'));

    currentSeries.data.setAll(data);

    let legend = chart.children.unshift(am5.Legend.new(root, {
      x: am5.percent(60),
      centerX: am5.percent(60),
      centerY: am5.p0,
    }));
    legend.labels.template.setAll({fill: am5.color("#ffffff")});
    legend.data.setAll(chart.series.values);


    dayBeginSeries.appear(1000);
    currentSeries.appear(1000);
    chart.appear(1000, 100);
    this.root = root
  }

  private updateChart(data: ChartData[]) {
    if (!this.root) return;

    const chart = this.root.container.children.getIndex(0) as am5xy.XYChart;
    const seriesCount = chart.series.length;
    if (seriesCount === 0) return;
    for (let i = 0; i < seriesCount; i++) {
      const series = chart.series.getIndex(i) as am5xy.LineSeries;

      if (series) {
        series.data.setAll(data);
        series.appear(1000);
      }
    }
  }

  private setupData(data: ComplexValueResponse[]) {
    let lastUpdate = 0
    let map = data.map(res => {
      // to get 2 values
      let count = 0;
      let filter = res.data.filter((value, index) => {
        if ((index === 0 || value.date.includes('06:00:00')) && count < 2) {
          count++;
          return true;
        }
        return false;
      });
      let chart: ChartData = {
        name: res.reservoir,
        currentValue: Number.parseFloat((Math.round(filter[0].value * 10) / 10).toFixed(1)),
        dayBeginValue: Number.parseFloat((Math.round(filter[1].value * 10) / 10).toFixed(1)),
      }
      lastUpdate = lastUpdate < new Date(filter[0].date).getTime() ? new Date(filter[0].date).getTime() : lastUpdate
      return chart;
    });
    this.currentTime = new Intl.DateTimeFormat('eu-EU', {hour: 'numeric'}).format(new Date(lastUpdate)) + ':00'
    return map;

  }
}

export interface ChartData {
  name: string
  currentValue: number
  dayBeginValue: number
}
