import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {ApiService} from "../../service/api.service";
import {ActivatedRoute} from "@angular/router";
import {CategorisedValueResponse, ValueResponse} from "../../shared/response/values-response";
import {ReservoirResponse} from "../../shared/response/reservoir-response";

@Component({
  selector: 'app-reservoir-yearly',
  standalone: true,
  templateUrl: './reservoir-yearly.component.html',
  imports: [
    NgForOf,
    CalendarModule,
    FormsModule
  ],
  styleUrl: './reservoir-yearly.component.css'
})
export class ReservoirYearlyComponent implements OnInit {
  reservoirName?: string
  months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]
  decade = [
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
  ]
  tableData: {
    category: string
    data: ValueResponse[][]
  }[] = []

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        const reservoir = value['reservoir']
        this.api.getReservoirById(reservoir).subscribe({
          next: (response: ReservoirResponse) => {
            this.reservoirName = response.name
          }
        })

        this.api.getDecadeYearsValues(reservoir).subscribe({
          next: (response: CategorisedValueResponse) => {
            this.tableData.push({
                category: 'Приток, м3/с',
                data: this.chunkArray(response.income.data)
              },
              {
                category: 'Попуск, м3/с',
                data: this.chunkArray(response.release.data)
              },
              {
                category: 'Уровень, м',
                data: this.chunkArray(response.level.data)
              },
              {
                category: 'Объём, млн. м3',
                data: this.chunkArray(response.volume.data)
              }
            )
            console.log(this.tableData)
            // let incomeArr = this.chunkArray(income);
          }
        })
      }
    })
  }


  private chunkArray(array: ValueResponse[]) {
    // 12 months with 3 decades = 36
    const size = 36
    return Array.from(
      {length: Math.ceil(array.length / size)},
      (_, index) =>
        array.slice(index * size, index * size + size)
    );
  }
}
