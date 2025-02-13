import {AfterViewInit, Component, Inject, NgZone, OnDestroy, PLATFORM_ID} from '@angular/core';
import {NgChartsModule} from "ng2-charts";
import {RouterLink} from "@angular/router";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {ChartConfiguration, Plugin} from "chart.js";
import {ApiService} from "../../service/api.service";
import {CategorisedArrayResponse, ComplexValueResponse} from "../../shared/response/values-response";
import {isPlatformBrowser, NgClass} from "@angular/common";

import * as am5 from '@amcharts/amcharts5';
import {ModsnowPercentResponse} from "../../shared/response/modsnow-response";
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
  public chartPlugin = [ChartDataLabels] as Plugin<'bar'>[];

  public chartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'white',
        }
      },
      y: {
        grid: {
          color: '#2D2D2D',
        },
        ticks: {
          color: 'white',
        }
      },

    },
    plugins: {
      tooltip: {
        enabled: false
      },
      legend: {
        display: true,
        labels: {
          color: 'white',
        }
      },
      datalabels: {
        color: 'white',
        align: "end",
        anchor: "end",
        rotation: 315,
      }
    },
  };

  public chartType = 'bar' as const;

  public category: 'income' | 'release' | 'volume' | 'level' = 'income';

  public labels: string[] = [];

  public chartData: any[] = [];

  private _reservoirsData?: CategorisedArrayResponse

  private root!: am5.Root;

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
          this._reservoirsData = response
          this.labels = response.income.map(value => value.reservoir)
          this.changeCategory(this.category)
        }
      })
    })
  }

  ngOnDestroy() {
    this.root.dispose()
  }

  public changeCategory(category: 'income' | 'release' | 'volume' | 'level'): void {
    this.category = category
    if (this._reservoirsData) {
      switch (category) {
        case "income": {
          this._setupChartData(this._reservoirsData.income)
          break
        }
        case "release": {
          this._setupChartData(this._reservoirsData.release)
          break
        }
        case "level": {
          this._setupChartData(this._reservoirsData.level)
          break
        }
        case "volume": {
          this._setupChartData(this._reservoirsData.volume)
          break
        }
      }
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


    xAxis.data.setAll(data);
    series.data.setAll(data);


    series.appear(1000);
    chart.appear(1000, 100);
    this.root = root
  }

  private _setupChartData(data: ComplexValueResponse[]) {
    this.chartData = []
    const filterData = this._filterData(data);
    let dayBeginValue = {
      data: [] as number[],
      label: '06:00',
      backgroundColor: '#014a67',
      barThickness: 24,
    }
    let currentValue = {
      data: [] as number[],
      label: '',
      backgroundColor: '#4eeefe',
      barThickness: 24,
    }
    filterData.forEach((item, index) => {
      if (index === 0) {
        currentValue.label = item[0].date.split(' ')[1].substring(0, 5)
      }
      // data sorted (new -> first)
      currentValue.data.push(parseFloat(item[0].value.toFixed(1)));
      dayBeginValue.data.push(parseFloat(item[1].value.toFixed(1)));
    })
    this.chartData.push(currentValue, dayBeginValue)
  }

  private _filterData(data: ComplexValueResponse[]) {
    return data.map(res => {
      // to get 2 values
      let count = 0;
      return res.data.filter((value, index) => {
        if ((index === 0 || value.date.includes('06:00:00')) && count < 2) {
          count++;
          return true;
        }
        return false;
      });
    });
  }
}
