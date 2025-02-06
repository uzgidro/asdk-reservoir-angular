import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {CategorisedArrayResponse} from "../../shared/response/values-response";
import {DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {NgChartsModule} from "ng2-charts";
import {LoaderComponent} from "../../shared/component/loader/loader.component";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import autoTable from "jspdf-autotable";
import {jsPDF} from 'jspdf';
import * as XLSX from "xlsx";
import {ChartConfiguration, ChartType, Plugin} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {ChartComponent} from "./chart/chart.component";

@Component({
  selector: 'app-reservoir-hourly',
  templateUrl: './reservoir-hourly.component.html',
  styleUrls: ['./reservoir-hourly.component.css'],
  imports: [
    NgForOf,
    NgIf,
    NgChartsModule,
    DatePipe,
    DecimalPipe,
    LoaderComponent,
    CardHeaderComponent,
    ChartComponent
  ],

  standalone: true

})
export class ReservoirHourlyComponent implements OnInit {
  selectedDate = new Date()
  times: Date[] = []

  reservoirsData: {
    id: number,
    name: string,
    income?: number[],
    release?: { latest: number, old: number },
    level?: { latest: number, old: number },
    volume?: { latest: number, old: number }
  }[] = []

  selectedReservoir: number = 0

  dataForChart: {
    id: number
    incomeDataset: any
    releaseDataset: any
    levelDataset: any
    volumeDataset: any
    labels: string[]
  }[] = []

  chartOptions: ChartConfiguration['options'] = {
    interaction: {mode: 'index', intersect: false},
    scales: {
      x: {
        grid: {
          color: '#2D2D2D',
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
      legend: {
        display: true, labels: {
          color: 'white',
          font: {
            size: 16,
          },
        }
      },
      datalabels: {
        color: "#FFF",
        align: "top",
        anchor: "start",
      }
    },
  };

  chartType: ChartType = 'line';
  chartPlugin = [ChartDataLabels] as Plugin[];

  get chart() {
    return this.dataForChart.find(e => e.id == this.selectedReservoir)
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {
  }

  async ngOnInit() {
    this.setInfoTime()
    this.api.getDashboardValues().subscribe({
      next: (response: CategorisedArrayResponse) => {
        this.setupTable(response)

        for (let i = 0; i < response.income.length; i++) {
          const id = response.income[i].reservoir_id
          const income = [{
            data: response.income[i].data.map(e => e.value),
            label: 'Kelish',
            borderColor: 'rgba(37, 99, 235,0.4)',
            pointBackgroundColor: 'rgba(37, 99, 235,0.5)',
            pointBorderColor: 'rgba(37, 99, 235,0.4)',
            pointHoverBackgroundColor: 'rgba(37, 99, 235,0.2)',
            pointHoverBorderColor: '#fff',
          }]
          const release = [{
            data: response.release[i].data.map(e => e.value),
            label: 'Chiqish',
            borderColor: 'rgba(225, 29, 72,0.4)',
            pointBackgroundColor: 'rgba(225, 29, 72,0.5)',
            pointBorderColor: 'rgba(225, 29, 72,0.4)',
            pointHoverBackgroundColor: 'rgba(225, 29, 72,0.8)',
            pointHoverBorderColor: '#fff',
          }]
          const level = [{
            data: response.level[i].data.map(e => e.value),
            label: 'Sath',
            borderColor: 'rgba(22, 163, 74,0.4)',
            pointBackgroundColor: 'rgba(22, 163, 74,0.5)',
            pointBorderColor: 'rgba(22, 163, 74,0.4)',
            pointHoverBackgroundColor: 'rgba(22, 163, 74,0.8)',
            pointHoverBorderColor: '#fff',
          }]
          const volume = [{
            data: response.volume[i].data.map(e => e.value),
            label: 'Hajm',
            borderColor: 'rgba(147, 51, 234,0.4)',
            pointBackgroundColor: 'rgba(147, 51, 234,0.5)',
            pointBorderColor: 'rgba(147, 51, 234,0.4)',
            pointHoverBackgroundColor: 'rgba(147, 51, 234,0.2)',
            pointHoverBorderColor: '#fff',
          }]
          this.dataForChart.push({
            id: id,
            incomeDataset: income,
            releaseDataset: release,
            levelDataset: level,
            volumeDataset: volume,
            labels: response.income[i].data.map(e => e.date)
          })
        }
        console.log(this.dataForChart)
      }
    })


    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.selectedReservoir = parseInt(value['reservoir'])
        console.log(this.selectedReservoir)
      }
    })

    this.setupAm()
  }

  navigateToReservoir(id: number) {
    this.router.navigate([], {
      queryParams: {reservoir: id}
    })
  }

  exportToExcel() {
    const table = document.getElementById('table');
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, "exported_table.xlsx");
  }

  exportTableToPDF() {
    const doc = new jsPDF({orientation: 'landscape'});
    const tableHeaders = [
      [
        {content: "Suv omborlar", rowSpan: 2}, // Объединяем по вертикали
        {content: "Suv sathi, m", colSpan: 3}, // Объединяем по горизонтали
        {content: "Suv hajmi, mln.m³", colSpan: 3},
        {content: "Suv kelishi, m³/s", colSpan: 7},
        {content: "Suv chiqishi, m³/s", rowSpan: 2},
      ],
      [
        {content: `${this.formatDate(this.times[1])}`},
        {content: `${this.formatDate(this.times[0])}`},
        {content: "Farqi"},
        {content: `${this.formatDate(this.times[1])}`},
        {content: `${this.formatDate(this.times[0])}`},
        {content: "Farqi"},
        {content: `${this.formatDate(this.times[5])}`},
        {content: `${this.formatDate(this.times[4])}`},
        {content: `${this.formatDate(this.times[3])}`},
        {content: `${this.formatDate(this.times[2])}`},
        {content: `${this.formatDate(this.times[1])}`},
        {content: `${this.formatDate(this.times[0])}`},
        {content: "Farqi"},
      ],
    ];

    // Преобразование данных таблицы в формат для AutoTable
    const tableData = this.reservoirsData.map(res => {
      if (res.level != undefined && res.volume != undefined && res.income != undefined && res.release != undefined) {
        return [
          res.name,
          res.level.old.toFixed(2) || '',
          res.level.latest.toFixed(2) || '',
          (res.level.latest - res.level.old).toFixed(2) || '',
          res.volume.old.toFixed(2) || '',
          res.volume.latest.toFixed(2) || '',
          (res.volume.latest - res.volume.old).toFixed(2) || '',
          ...(res.income.map(i => i.toFixed(2)) || []),
          ((res.income[res.income.length - 1] - res.income[res.income.length - 2]).toFixed(2) || ''),
          res.release.latest.toFixed(2) || ''
        ];
      } else {
        return []
      }
    });

    // Генерация таблицы в PDF
    autoTable(doc, {
      head: tableHeaders, // Заголовки
      body: tableData,      // Данные таблицы
      startY: 10,           // Начальная позиция по вертикали
      styles: {fontSize: 8}, // Общие стили таблицы
      headStyles: {fillColor: [41, 128, 185]}, // Цвет заголовков
    });

    // Сохранение PDF
    doc.save('Reservoirs-Table.pdf');
  }

  private formatDate(date: Date) {
    const formattedTime = new Intl.DateTimeFormat("en-GB", {hour: "2-digit", minute: "2-digit"}).format(date);
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit"
    }).format(this.selectedDate); // Формат дня, месяца и года
    return `${formattedTime}\n(${formattedDate})`;
  }

  private setupTable(response: CategorisedArrayResponse) {
    for (let item of response.release) {
      this.reservoirsData.push({
        id: item.reservoir_id,
        name: item.reservoir,
        release: {
          latest: item.data[item.data.length - 1].value,
          old: item.data[item.data.length - 2].value
        }
      })
    }
    for (let item of response.level) {
      let data =
        this.reservoirsData.find(value => value.id === item.reservoir_id)
      if (data) {
        data.level = {
          latest: item.data[item.data.length - 1].value,
          old: item.data[item.data.length - 2].value
        }
      }
    }
    for (let item of response.volume) {
      let data =
        this.reservoirsData.find(value => value.id === item.reservoir_id)
      if (data) {
        data.volume = {
          latest: item.data[item.data.length - 1].value,
          old: item.data[item.data.length - 2].value
        }
      }
    }
    for (let item of response.income) {
      let data =
        this.reservoirsData.find(value => value.id === item.reservoir_id)
      if (data) {
        data.income = item.data.map(value => value.value).slice(-6)
      }
    }
  }

  private setInfoTime() {
    const currentTime = new Date().getHours();
    let currentMonth = new Date().getMonth()
    let currentDate = new Date().getDate()
    let currentYear = new Date().getFullYear()

    let roundedTime: number;

    if (currentTime % 2 == 0) {
      roundedTime = currentTime
    } else {
      roundedTime = currentTime - 1
    }

    for (let i = 0; i <= 5; i++) {
      this.times.push(new Date(currentYear, currentMonth, currentDate, roundedTime))
      roundedTime -= 2
    }
  }

  private setupAm() {
    let root = am5.Root.new("chartdiv");

    const myTheme = am5.Theme.new(root);

// Move minor label a bit down
    myTheme.rule("AxisLabel", ["minor"]).setAll({
      dy: 1
    });

// Tweak minor grid opacity
    myTheme.rule("Grid", ["minor"]).setAll({
      strokeOpacity: 0.08
    });

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root),
      myTheme
    ]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      paddingLeft: 0
    }));


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomX"
    }));
    cursor.lineY.set("visible", false);

    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;

    function generateData() {
      value = Math.round((Math.random() * 10 - 5) + value);
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value
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
      maxDeviation: 0,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true,
        minGridDistance: 200,
        minorLabelsEnabled: true
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));

    xAxis.set("minorDateFormats", {
      day: "dd",
      month: "MM"
    });

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

// Actual bullet
    series.bullets.push(function () {
      let bulletCircle = am5.Circle.new(root, {
        radius: 5,
        fill: series.get("fill")
      });
      return am5.Bullet.new(root, {
        sprite: bulletCircle
      })
    })

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));

    let data = generateDatas(30);
    series.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
  }
}
