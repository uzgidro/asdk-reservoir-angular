import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GesRoutingModule} from './ges-routing.module';
import {RouterModule} from "@angular/router";
import {GesLayoutComponent} from './shared/component/ges-layout/ges-layout.component';
import {GesDashboardComponent} from './ges-dashboard/ges-dashboard.component';
import {AppModule} from "../app.module";
import {LoaderComponent} from "../shared/component/loader/loader.component";
import {GesService} from "./shared/service/ges.service";


@NgModule({
  declarations: [
    GesLayoutComponent,
    GesDashboardComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    GesRoutingModule,
  ],
  providers: [
    GesService
  ]
})
export class GesModule {
}
