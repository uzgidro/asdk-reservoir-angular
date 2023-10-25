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
import { AggregateTableFieldComponent } from './shared/component/aggregate-table-field/aggregate-table-field.component';
import { ChartsTempComponent } from './shared/temp/charts-temp/charts-temp.component';
import { GesComponent } from './ges/ges.component';
import { AggregateTableComponent } from './shared/component/aggregate-table/aggregate-table.component';
import {NgOptimizedImage} from "@angular/common";
import { AggregateValuesTableComponent } from './shared/component/aggregate-values-table/aggregate-values-table.component';
import { ChartComponent } from './shared/temp/chart/chart.component';
import { GesVerticalTableComponent } from './shared/component/get-vertical-table/ges-vertical-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggerComponent } from './logger/component/logger.component';
import {MatTooltipModule} from "@angular/material/tooltip";

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
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgOptimizedImage,
        BrowserAnimationsModule,
        MatTooltipModule
    ],
  exports: [HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
