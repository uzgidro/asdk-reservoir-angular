import {AfterViewInit, Inject, NgZone, OnDestroy, PLATFORM_ID} from '@angular/core';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {isPlatformBrowser} from "@angular/common";

class Lol implements AfterViewInit, OnDestroy {
  private root!: am5.Root;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) {
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    let root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      layout: root.verticalLayout,
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft: 0
    }));


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);


// Generate random data
    let date = new Date();
    date.setHours(0, 0, 0, 0);

    function generateData() {
      const coefficient = 100;
      const value = Math.round((Math.random() * 10 - 5) + coefficient);
      const value2 = Math.round((Math.random() * 10 - 5) + coefficient);
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value,
        value2: value2
      };
    }

    function generateDatas(count: number) {
      let data = [];
      for (var i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.2,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        strokeWidth: 2,
        minorGridEnabled: true
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {
        pan: "zoom"
      })
    }));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let kelish = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Kelish",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    let chiqish = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Chiqish",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value2",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));


// Set data
    let data = generateDatas(1200);
    kelish.data.setAll(data);
    chiqish.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
    kelish.appear(1000);
    chiqish.appear(1000);
    chart.appear(1000, 100);


//     this.browserOnly(() => {
//       let root = am5.Root.new("chartdiv");
//
//       root.setThemes([
//         am5themes_Animated.new(root),
//         am5themes_Material.new(root),
//       ]);
//
    root.interfaceColors.set("grid", am5.color('#fff'));
//
//       let chart = root.container.children.push(
//         am5xy.XYChart.new(root, {
//           panY: false,
//           layout: root.verticalLayout
//         })
//       );
//
//       // Define data
//       let data = [
//         {
//           category: "Research",
//           value1: [1000,123,234,345,624],
//           value2: 588
//         },
//         {
//           category: "Marketing",
//           value1: [1200,123,234,345,624],
//           value2: 1800
//         },
//         {
//           category: "Sales",
//           value1: [850,123,234,345,624],
//           value2: 1230
//         }
//       ];
//
//       // Create Y-axis
//       let yAxis = chart.yAxes.push(
//         am5xy.ValueAxis.new(root, {
//           renderer: am5xy.AxisRendererY.new(root, {})
//         })
//       );
//
//       // Create X-Axis
//       let xAxis = chart.xAxes.push(
//         am5xy.DateAxis.new(root, {
//           renderer: am5xy.AxisRendererX.new(root, {}),
//           baseInterval: "day",
//         })
//       );
//
//
    xAxis.get("renderer").labels.template.setAll({
      fill: am5.color("#fff")
    });

    yAxis.get("renderer").labels.template.setAll({
      fill: am5.color("#fff")
    });
//       xAxis.data.setAll(data);
//
//       // Create series
//       let series1 = chart.series.push(
//         am5xy.ColumnSeries.new(root, {
//           name: "Series 1",
//           xAxis: xAxis,
//           yAxis: yAxis,
//           valueYField: "value1",
//           categoryXField: "category"
//         })
//       );
//       series1.data.setAll(data);
//
//       let series2 = chart.series.push(
//         am5xy.ColumnSeries.new(root, {
//           name: "Series 2",
//           xAxis: xAxis,
//           yAxis: yAxis,
//           valueYField: "value2",
//           categoryXField: "category"
//         })
//       );
//       series2.data.setAll(data);
//
//       // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {}));
//
// // Связываем легенду с данными графика
//     legend.data.setAll(chart.series.values);
    legend.labels.template.setAll({
      fill: am5.color("#ffffff") // Цвет текста
    });
    legend.data.setAll(chart.series.values);
//
//       // Add cursor
//       chart.set("cursor", am5xy.XYCursor.new(root, {}));
//
//       this.root = root;
//     });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
}
