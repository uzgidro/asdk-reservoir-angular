import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GesRoutingModule} from './ges-routing.module';
import {RouterModule} from "@angular/router";
import {GesLayoutComponent} from './shared/component/ges-layout/ges-layout.component';
import {GesDashboardComponent} from './ges-dashboard/ges-dashboard.component';
import {AppModule} from "../app.module";
import {LoaderComponent} from "../shared/component/loader/loader.component";
import {GesService} from "./shared/service/ges.service";
import {SharedModule} from "../shared/module/shared.module";


@NgModule({
  declarations: [
    GesLayoutComponent,
    GesDashboardComponent
  ],
  imports: [
    CommonModule,
    GesRoutingModule,
    SharedModule
  ],
  exports: [

  ],
  providers: [
    GesService
  ]
})
export class GesModule {
}
