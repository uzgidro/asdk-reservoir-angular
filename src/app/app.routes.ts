import {Routes} from "@angular/router";
import {MainLayoutComponent} from "./shared/component/main-layout/main-layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {WaterRecoursesComponent} from "./water-recourses/water-recourses.component";
import {RegionComponent} from "./region/region.component";
import {GesComponent} from "./ges/ges.component";
import {DashboardReservoirComponent} from "./dashboard/dashboard-reservoir/dashboard-reservoir.component";
import {ReservoirComponent} from "./reservoir/reservoir.component";
import {ReservoirHourlyComponent} from "./reservoir/reservoir-hourly/reservoir-hourly.component";
import {ReservoirDecadeComponent} from "./reservoir/reservoir-decade/reservoir-decade.component";
import {ReservoirMonthComponent} from "./reservoir/reservoir-month/reservoir-month.component";
import {ReservoirYearlyComponent} from "./reservoir/reservoir-yearly/reservoir-yearly.component";
import {ReservoirLvComponent} from "./reservoir/reservoir-lv/reservoir-lv.component";
import {BlankPageComponent} from "./shared/temp/blank-page/blank-page.component";
import {ReservoirAnalyticsComponent} from "./reservoir/reservoir-analytics/reservoir-analytics.component";
import {ModsnowComponent} from "./modsnow/modsnow.component";
import {ModsnowDailyComponent} from "./modsnow/modsnow-daily/modsnow-daily.component";
import {ModsnowYearlyComponent} from "./modsnow/modsnow-yearly/modsnow-yearly.component";
import {WeatherComponent} from "./reservoir/weather/weather.component";
import {HydrometerComponent} from "./hydrometer/hydrometer.component";
import {HydroPostComponent} from "./hydrometer/hydro-post/hydro-post.component";
import {HydroMeterComponent} from "./hydrometer/hydro-meter/hydro-meter.component";
import {HydroIndicatorComponent} from "./hydrometer/hydro-indicator/hydro-indicator.component";
import {HydroWorksComponent} from "./hydrometer/hydro-works/hydro-works.component";
import {ExploitationComponent} from "./exploitation/exploitation.component";
import {OrdersComponent} from "./reservoir/orders/orders.component";
import {TopPositionScreenComponent} from "./top-position-screen/top-position-screen.component";
import {LowChatkalComponent} from "./low-chatkal/low-chatkal.component";
import {LCDashboardComponent} from "./low-chatkal/l-c-dashboard/l-c-dashboard.component";
import {LCPlotinaComponent} from "./low-chatkal/l-c-plotina/l-c-plotina.component";

export const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'recourses', component: WaterRecoursesComponent},
      {path: 'region', component: RegionComponent},
      {path: 'ges', component: GesComponent},
      {path: 'reservoir', component: DashboardReservoirComponent},
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
        ]
      },
      {
        path: 'snow', component: ModsnowComponent, children: [
          {path: '', pathMatch: 'full', redirectTo: 'current'},
          {path: 'current', component: ModsnowDailyComponent},
          {path: 'all-time', component: ModsnowYearlyComponent}
        ]
      },
      {path: 'weather', component: WeatherComponent},
      {
        path: 'hydro', component: HydrometerComponent, children: [
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
      {path: 'map', component: TopPositionScreenComponent}
    ]
  },
  {
    path: 'lc', component: LowChatkalComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      {path: 'dashboard', component: LCDashboardComponent},
      {path: 'reservoir', component: LCPlotinaComponent}
    ]
  }
];
