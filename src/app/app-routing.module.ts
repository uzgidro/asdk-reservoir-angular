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
import {WaterRecoursesComponent} from "./water-recourses/water-recourses.component";
import {ReservoirLvComponent} from "./reservoir/reservoir-lv/reservoir-lv.component";
import {ExploitationComponent} from "./exploitation/exploitation.component";
import {DashboardMapComponent} from "./dashboard/dashboard-map/dashboard-map.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'recourses', component: WaterRecoursesComponent},
      {path: 'region', component: RegionComponent},
      {path: 'ges', component: GesComponent},
      {
        path: 'water', component: ReservoirComponent, children: [
          {path: '', pathMatch: 'full', redirectTo: 'current'},
          {path: 'current', component: ReservoirHourlyComponent},
          {path: 'decade', component: ReservoirDecadeComponent},
          {path: 'month', component: ReservoirMonthComponent},
          {path: 'year', component: ReservoirYearlyComponent},
          {path: 'lv', component: ReservoirLvComponent},
          {path: 'filter', component: BlankPageComponent},
          {path: 'analytics', component: ReservoirAnalyticsComponent},
          {path: 'schedule', component: ReservoirScheduleComponent},
        ]
      },
      {
        path: 'snow', children: [
          {path: '', pathMatch: 'full', redirectTo: 'current'},
          {path: 'current', component: ModsnowDailyComponent},
          {path: 'all-time', component: ModsnowYearlyComponent}
        ]
      },
      {
        path: 'weather', component: WeatherComponent
      },
      {
        path: 'hydro', children: [
          {path: '', pathMatch: 'full', redirectTo: 'posts'},
          {path: 'posts', component: HydroPostComponent},
          {path: 'meter', component: HydroMeterComponent},
          {path: 'indicator', component: HydroIndicatorComponent},
          {path: 'journal', component: BlankPageComponent},
          {path: 'contract', component: BlankPageComponent},
          {path: 'works', component: HydroWorksComponent}
        ]
      },
      {path: 'rules', component: ExploitationComponent},
      {path: 'docs', component: OrdersComponent},
      {path: 'map', component: DashboardMapComponent}
    ]
  },
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
export class AppRoutingModule {
}
