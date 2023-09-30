import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/component/main-layout/main-layout.component';
import {GesComponent} from './ges/ges.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { DashboardOneComponent } from './dashboard-one/dashboard-one.component';
import { PiezoComponent } from './piezo/piezo.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    GesComponent,
    DashboardComponent,
    SidebarComponent,
    DashboardOneComponent,
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
