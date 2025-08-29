import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {CardHeaderComponent} from "../shared/component/card-header/card-header.component";
import {DashboardCurrentChartComponent} from "./dashboard-current-chart/dashboard-current-chart.component";
import {ApiService} from "../service/api.service";
import {ReservoirResponse} from "../shared/response/reservoir-response";
import {Forecast, WeatherCurrentDto, WeatherCurrentResponse} from "../shared/response/weather-response";
import {WeatherService} from "../service/weather.service";
import {WeatherApiService} from "../service/weather-api.service";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {DashboardSnowChartComponent} from "./dashboard-snow-char/dashboard-snow-char.component";
import {CardWrapperComponent} from "../shared/component/card-wrapper/card-wrapper.component";
import {
  DecadeManyYearsIncomeTableComponent
} from "../reservoir/reservoir-decade/decade-many-years-income-table/decade-many-years-income-table.component";
import {DashboardSnowTableComponent} from "./dashboard-snow-table/dashboard-snow-table.component";
import {DashboardSnowSliderComponent} from "./dashboard-snow-slider/dashboard-snow-slider.component";
import {forkJoin, map, of, Subject, switchMap, takeUntil} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CarouselModule,
    CardHeaderComponent,
    DashboardCurrentChartComponent,
    NgOptimizedImage,
    DashboardSnowChartComponent,
    CardWrapperComponent,
    DecadeManyYearsIncomeTableComponent,
    DashboardSnowTableComponent,
    DashboardSnowSliderComponent,
    DatePipe,
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public reservoirs: string[] = []

  private _weatherDaily: {
    reservoir: string
    position: number
    forecast: Forecast[]
  }[] = []

  get forecastDate() {
    if (this._weatherDaily.length > 0) {
      return this._weatherDaily[0].forecast?.map(value => value.date)
    }
    return undefined
  }

  get weatherDaily(): { reservoir: string; position: number; forecast: Forecast[] }[] {
    return this._weatherDaily.sort((a, b) => a.position - b.position);
  }

  constructor(private apiService: ApiService, private weatherApiService: WeatherApiService, private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.apiService.getReservoirs().pipe(
      switchMap((reservoirs: ReservoirResponse[]) => {
        if (!reservoirs || reservoirs.length === 0) {
          return of([]); // Если нет водохранилищ, возвращаем пустой массив
        }
        this.reservoirs = reservoirs.map(value => value.name);

        // Создаем массив Observable для каждого запроса прогноза
        const forecastObservables = reservoirs.map(reservoir =>
          this.weatherApiService.getForecast(reservoir.lat, reservoir.lon).pipe(
            map(forecastResponse => ({ // Преобразуем ответ в нужную структуру
              reservoir: reservoir.name,
              position: reservoir.position,
              forecast: this.processForecastResponse(forecastResponse)
            }))
          )
        );

        // Выполняем все запросы параллельно и ждем их завершения
        return forkJoin(forecastObservables);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (weatherData) => {
        this._weatherDaily = weatherData;
      },
      error: (err) => console.error('Ошибка при загрузке данных о погоде:', err)
    });
  }

  private processForecastResponse(response: any): Forecast[] {
    const forecast: Forecast[] = [];
    if (response && response.list) {
      for (const res of response.list as WeatherCurrentResponse[]) {
        const weather = this.weatherService.convertCurrentResponse(res);
        if (weather.time.getDate() !== new Date().getDate()) {
          let existingForecast = forecast.find(item => item.date.getDate() === weather.time.getDate());
          if (!existingForecast) {
            existingForecast = {date: weather.time};
            forecast.push(existingForecast);
          }
          this.updateForecastItem(existingForecast, weather);
        }
      }
    }
    return forecast.slice(0, 3);
  }

  private updateForecastItem(forecastItem: Forecast, weather: WeatherCurrentDto) {
    if (weather.time.getHours() === 11) {
      forecastItem.dayIcon = weather.weatherIcon;
      forecastItem.dayIconDescription = weather.weatherDescription;
      forecastItem.dayTemperature = weather.temp;
    } else if (weather.time.getHours() === 23) {
      forecastItem.nightIcon = weather.weatherIcon;
      forecastItem.nightIconDescription = weather.windDirection;
      forecastItem.nightTemperature = weather.temp;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
