import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./shared/component/main-layout/main-layout.component";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RegionComponent} from "./region/region.component";
import {GesComponent} from "./ges/ges.component";
import {ReservoirComponent} from "./reservoir/reservoir.component";
import {BlankPageComponent} from "./shared/temp/blank-page/blank-page.component";
import {ReservoirHourlyComponent} from "./reservoir/reservoir-hourly/reservoir-hourly.component";
import {ReservoirDecadeComponent} from "./reservoir/reservoir-decade/reservoir-decade.component";
import {ReservoirDashboardComponent} from "./reservoir/reservoir-dashboard/reservoir-dashboard.component";
import {ModsnowDailyComponent} from "./reservoir/modsnow-daily/modsnow-daily.component";
import {ModsnowYearlyComponent} from "./reservoir/modsnow-yearly/modsnow-yearly.component";
import {ReservoirYearlyComponent} from "./reservoir/reservoir-yearly/reservoir-yearly.component";
import {HydroPostComponent} from "./reservoir/hydro-post/hydro-post.component";
import {OrdersComponent} from "./reservoir/orders/orders.component";
import {ReservoirAnalyticsComponent} from "./reservoir/reservoir-analytics/reservoir-analytics.component";
import {HydroMeterComponent} from "./reservoir/hydro-meter/hydro-meter.component";
import {HydroIndicatorComponent} from "./reservoir/hydro-indicator/hydro-indicator.component";
import {HydroWorksComponent} from "./reservoir/hydro-works/hydro-works.component";
import {ReservoirMonthComponent} from "./reservoir/reservoir-month/reservoir-month.component";
import {WeatherComponent} from "./reservoir/weather/weather.component";
import {ReservoirScheduleComponent} from "./reservoir/reservoir-schedule/reservoir-schedule.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'region', component: RegionComponent},
      {path: 'ges', component: GesComponent},
      {path: 'reservoir', component: ReservoirComponent, children: [
          {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
          {path: 'dashboard', component: ReservoirDashboardComponent},
          {path: 'water', children: [
              {path: '', pathMatch: 'full', redirectTo: 'current'},
              {path: 'current', component: ReservoirHourlyComponent},
              {path: 'decade', component: ReservoirDecadeComponent},
              {path: 'month', component: ReservoirMonthComponent},
              {path: 'year', component: ReservoirYearlyComponent},
              {path: 'analytics', component: ReservoirAnalyticsComponent},
              {path: 'schedule', component: ReservoirScheduleComponent},
            ]},
          {path: 'snow', children: [
              {path: '', pathMatch: 'full', redirectTo: 'current'},
              {path: 'current', component: ModsnowDailyComponent},
              {path: 'all-time', component: ModsnowYearlyComponent}
            ]},
          {
            path: 'weather', component: WeatherComponent
          },
          {path: 'hydro', children: [
              {path: '', pathMatch: 'full', redirectTo: 'posts'},
              {path: 'posts', component: HydroPostComponent},
              {path: 'meter', component: HydroMeterComponent},
              {path: 'indicator', component: HydroIndicatorComponent},
              {path: 'journal', component: BlankPageComponent},
              {path: 'contract', component: BlankPageComponent},
              {path: 'works', component: HydroWorksComponent}
            ]},
          {path: 'docs', component: OrdersComponent}
        ]},
      // {
      //   path: 'not-found', component: NotFoundComponent
      // },
      // {
      //   path: '**', component: NotFoundComponent
      // }
    ]
  },
  // {
  //   path: 'login', component: LoginComponent
  // },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})]
})
export class AppRoutingModule {}
