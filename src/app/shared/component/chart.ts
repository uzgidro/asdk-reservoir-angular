import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {isPlatformBrowser} from "@angular/common";
import {Inject, NgZone, PLATFORM_ID} from "@angular/core";
import {ChartData, ClusterChartData, DateChartData} from "../struct/chart";

export class Chart {
  protected root!: am5.Root

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) {
  }

  protected browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
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

  private updateChart(data: ChartData[]) {
    if (!this.root) return;

    const chart = this.root.container.children.getIndex(0) as am5xy.XYChart;
    if (typeof data) {}

    const series = chart.series.getIndex(0) as am5xy.LineSeries;

    if (series) {
      series.data.setAll(data);
      series.appear(1000);
    }
  }
}
