import {AfterViewInit, Component, Inject, NgZone, OnDestroy, PLATFORM_ID} from '@angular/core';
import {ModsnowService} from "../../service/modsnow.service";
import {NgChartsModule} from "ng2-charts";
import {RouterLink} from "@angular/router";

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {isPlatformBrowser} from "@angular/common";
import {ModsnowPercentResponse} from "../../shared/response/modsnow-response";

@Component({
  selector: 'app-dashboard-snow-chart',
  standalone: true,
  imports: [
    NgChartsModule,
    RouterLink
  ],
  templateUrl: './dashboard-snow-char.component.html',
  styleUrl: './dashboard-snow-char.component.css'
})
export class DashboardSnowChartComponent implements AfterViewInit, OnDestroy {

  private root!: am5.Root;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone, private modsnow: ModsnowService) {
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
      this.modsnow.getPercent().subscribe(response => {
          this.renderChart(response)
        }
      )
    });
  }

  ngOnDestroy() {
    if (this.root != undefined) {
      this.root.dispose()
    }
  }

  private renderChart(data: ModsnowPercentResponse[]) {
    let root = am5.Root.new("chartdiv");

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
      paddingRight: 1
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
      max: 100,
      maxDeviation: 0.3,
      renderer: yRenderer
    }));

    xAxis.get("renderer").labels.template.setAll({fill: am5.color("#fff")});
    yAxis.get("renderer").labels.template.setAll({fill: am5.color("#fff")});

    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Qor qoplama, %",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "percent",
      sequencedInterpolation: true,
      categoryXField: "name",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    series.bullets.push(function () {
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

    series.columns.template.setAll({cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0});
    series.columns.template.set('fill', am5.color('#4eeefe'));
    // series.columns.template.adapters.add("fill", function (fill, target) {
    //   return chart.get("colors")!.getIndex(series.columns.indexOf(target));
    // });
    //
    // series.columns.template.adapters.add("stroke", function (stroke, target) {
    //   return chart.get("colors")!.getIndex(series.columns.indexOf(target));
    // });


    xAxis.data.setAll(data);
    series.data.setAll(data);


    series.appear(1000);
    chart.appear(1000, 100);
    this.root = root
  }
}
