import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/component/main-layout/main-layout.component';
import {GesComponent} from './ges/ges.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { RegionComponent } from './region/region.component';
import { PiezoComponent } from './piezo/piezo.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    GesComponent,
    DashboardComponent,
    NavbarComponent,
    RegionComponent,
    PiezoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
