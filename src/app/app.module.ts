import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/component/main-layout/main-layout.component';
import {GeslolComponent} from './shared/temp/geslol/geslol.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {DashboardComponent} from './dashboard/dashboard.component';
import {NavbarComponent} from './shared/component/navbar/navbar.component';
import {RegionComponent} from './region/region.component';
import {PiezoComponent} from './shared/temp/piezo/piezo.component';
import {LoaderComponent} from './shared/component/loader/loader.component';
import {GesTableComponent} from "./shared/component/ges-table/ges-table.component";
import {AggregateTableFieldComponent} from './shared/component/aggregate-table-field/aggregate-table-field.component';
import {ChartsTempComponent} from './shared/temp/charts-temp/charts-temp.component';
import {GesComponent} from './ges/ges.component';
import {AggregateTableComponent} from './shared/component/aggregate-table/aggregate-table.component';
import {NgOptimizedImage} from "@angular/common";
import {
  AggregateValuesTableComponent
} from './shared/component/aggregate-values-table/aggregate-values-table.component';
import {ChartComponent} from './shared/temp/chart/chart.component';
import {GesVerticalTableComponent} from './shared/component/get-vertical-table/ges-vertical-table.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoggerComponent} from './logger/component/logger.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {ResizableModule} from "angular-resizable-element";
import {ReservoirComponent} from './reservoir/reservoir.component';
import {ReservoirHourlyComponent} from "./reservoir/reservoir-hourly/reservoir-hourly.component";
import {ReservoirTenDayComponent} from './reservoir/reservoir-daily/reservoir-ten-day.component';
import {BlankPageComponent} from './shared/temp/blank-page/blank-page.component';
import {ReservoirDashboardComponent} from './reservoir/reservoir-dashboard/reservoir-dashboard.component';
import {NgChartsModule} from "ng2-charts";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {HydroWorksComponent} from "./reservoir/hydro-works/hydro-works.component";
import {ChartModule} from "primeng/chart";
import {WeatherComponent} from "./shared/component/weather/weather.component";
import {ReservoirCurrentComponent} from "./shared/component/reservoir-current/reservoir-current.component";
import {WeatherDetailedComponent} from "./shared/component/wearher-detailed/weather-detailed.component";
import {RusDatePipe} from "./shared/pipe/rus-date.pipe";
import {RusMonthPipe} from "./shared/pipe/rus-month.pipe";

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
    LoaderComponent,
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
    ReservoirTenDayComponent,
    BlankPageComponent,
    ReservoirDashboardComponent,
    HydroWorksComponent
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
        WeatherComponent,
        ReservoirCurrentComponent,
        WeatherDetailedComponent,
        RusDatePipe,
        RusMonthPipe
    ],
  exports: [HttpClientModule],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
