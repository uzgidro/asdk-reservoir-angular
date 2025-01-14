import {Component, OnInit} from '@angular/core';
import {NgChartsModule} from "ng2-charts";
import {RouterLink} from "@angular/router";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {ChartConfiguration, Plugin} from "chart.js";
import {ApiService} from "../../service/api.service";
import {CategorisedArrayResponse, ComplexValueResponse} from "../../shared/response/values-response";
import {NgClass} from "@angular/common";

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
export class DashboardCurrentChartComponent implements OnInit {
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

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getDashboardValues().subscribe({
      next: (response: CategorisedArrayResponse) => {
        this._reservoirsData = response
        this.labels = response.income.map(value => value.reservoir)
        this.changeCategory(this.category)
      }
    })
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
