import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {LoaderComponent} from './shared/component/loader/loader.component';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {
  AggregateValuesTableComponent
} from './shared/component/aggregate-values-table/aggregate-values-table.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ResizableModule} from 'angular-resizable-element';
import {CalendarModule} from 'primeng/calendar';
import {FormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {ChartModule} from 'primeng/chart';
import {ReservoirCurrentComponent} from './shared/component/reservoir-current/reservoir-current.component';
import {RusDatePipe} from './shared/pipe/rus-date.pipe';
import {RusMonthPipe} from './shared/pipe/rus-month.pipe';
import {MetricSelectComponent} from './shared/component/metric-select/metric-select.component';
import {Chart, registerables} from "chart.js";

@NgModule({
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatTooltipModule,
    ResizableModule,
    CalendarModule,
    FormsModule,
    ToastModule,
    ChartModule,
    ReservoirCurrentComponent,
    RusDatePipe,
    RusMonthPipe,
    LoaderComponent,
    MetricSelectComponent,
    AggregateValuesTableComponent
  ],
  providers: [
    MessageService,
    {
      provide: 'ChartSetup',
      useFactory: () => {
        Chart.register(...registerables);
        return Chart;
      }
    },
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule {
}
