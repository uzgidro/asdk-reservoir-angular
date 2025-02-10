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

  dataForChart: ChartWrapper[] = []

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
        console.log(response)

        for (let i = 0; i < response.income.length; i++) {
          const id = response.income[i].reservoir_id
          const income = {
            data: response.income[i].data.reverse().map(e => ({timestamp: new Date(e.date).getTime(), value: e.value})),
            name: 'Kelish',
            color: 'rgba(37, 99, 235,0.4)',
          }
          const release = {
            data: response.release[i].data.reverse().map(e => ({timestamp: new Date(e.date).getTime(), value: e.value})),
            name: 'Chiqish',
            color: 'rgba(225, 29, 72,0.4)',
          }
          const level = {
            data: response.level[i].data.reverse().map(e => ({timestamp: new Date(e.date).getTime(), value: e.value})),
            name: 'Sath',
            color: 'rgba(22, 163, 74,0.4)',
          }
          const volume = {
            data: response.volume[i].data.reverse().map(e => ({timestamp: new Date(e.date).getTime(), value: e.value})),
            name: 'Hajm',
            color: 'rgba(147, 51, 234,0.4)',
          }
          this.dataForChart.push({
            id: id,
            incomeDataset: income,
            releaseDataset: release,
            levelDataset: level,
            volumeDataset: volume,
          })
        }
      }
    })


    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.selectedReservoir = parseInt(value['reservoir'])
      }
    })
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
}

export interface ChartWrapper {
  id: number
  incomeDataset: ChartData
  releaseDataset: ChartData
  levelDataset: ChartData
  volumeDataset: ChartData
}

export interface ChartData {
  name: string,
  data: {
    value: number,
    timestamp: number,
  }[]
  color: string

}
