import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/component/main-layout/main-layout.component';
import {GeslolComponent} from './shared/temp/geslol/geslol.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NavbarComponent} from './shared/component/navbar/navbar.component';
import {RegionComponent} from './region/region.component';
import {PiezoComponent} from './shared/temp/piezo/piezo.component';
import {LoaderComponent} from './shared/component/loader/loader.component';
import {GesTableComponent} from './shared/component/ges-table/ges-table.component';
import {AggregateTableFieldComponent} from './shared/component/aggregate-table-field/aggregate-table-field.component';
import {ChartsTempComponent} from './shared/temp/charts-temp/charts-temp.component';
import {GesComponent} from './ges/ges.component';
import {AggregateTableComponent} from './shared/component/aggregate-table/aggregate-table.component';
import {NgOptimizedImage} from '@angular/common';
import {
  AggregateValuesTableComponent
} from './shared/component/aggregate-values-table/aggregate-values-table.component';
import {ChartComponent} from './shared/temp/chart/chart.component';
import {GesVerticalTableComponent} from './shared/component/get-vertical-table/ges-vertical-table.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoggerComponent} from './logger/component/logger.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ResizableModule} from 'angular-resizable-element';
import {ReservoirComponent} from './reservoir/reservoir.component';
import {ReservoirHourlyComponent} from './reservoir/reservoir-hourly/reservoir-hourly.component';
import {ReservoirDecadeComponent} from './reservoir/reservoir-decade/reservoir-decade.component';
import {BlankPageComponent} from './shared/temp/blank-page/blank-page.component';
import {ReservoirDashboardComponent} from './reservoir/reservoir-dashboard/reservoir-dashboard.component';
import {NgChartsModule} from 'ng2-charts';
import {CalendarModule} from 'primeng/calendar';
import {FormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {HydroWorksComponent} from './reservoir/hydro-works/hydro-works.component';
import {ChartModule} from 'primeng/chart';
import {WeatherFrameComponent} from './shared/component/weather/weather-frame.component';
import {ReservoirCurrentComponent} from './shared/component/reservoir-current/reservoir-current.component';
import {WeatherDetailedFrameComponent} from './shared/component/wearher-detailed/weather-detailed-frame.component';
import {RusDatePipe} from './shared/pipe/rus-date.pipe';
import {RusMonthPipe} from './shared/pipe/rus-month.pipe';
import {WeatherComponent} from './reservoir/weather/weather.component';
import {MetricSelectComponent} from './shared/component/metric-select/metric-select.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    GeslolComponent,
    DashboardComponent,
    NavbarComponent,
    RegionComponent,
    PiezoComponent,
    GesTableComponent,
    AggregateTableComponent,
    ChartsTempComponent,
    GesComponent,
    AggregateTableFieldComponent,
    AggregateValuesTableComponent,
    ChartComponent,
    GesVerticalTableComponent,
    LoggerComponent,
    ReservoirComponent,
    ReservoirHourlyComponent,
    ReservoirDecadeComponent,
    BlankPageComponent,
    ReservoirDashboardComponent,
    HydroWorksComponent,
    WeatherFrameComponent,
    WeatherDetailedFrameComponent,
    WeatherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatTooltipModule,
    ResizableModule,
    NgChartsModule,
    CalendarModule,
    FormsModule,
    ToastModule,
    ChartModule,
    ReservoirCurrentComponent,
    RusDatePipe,
    RusMonthPipe,
    LoaderComponent,
    MetricSelectComponent,
  ],
  exports: [HttpClientModule, WeatherDetailedFrameComponent, WeatherFrameComponent],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
