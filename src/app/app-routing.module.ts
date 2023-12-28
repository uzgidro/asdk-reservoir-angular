import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./shared/component/main-layout/main-layout.component";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RegionComponent} from "./region/region.component";
import {GesComponent} from "./ges/ges.component";
import {ReservoirComponent} from "./reservoir/reservoir.component";
import {BlankPageComponent} from "./shared/temp/blank-page/blank-page.component";
import {HourlyReservoirComponent} from "./reservoir/hourly-reservoir/hourly-reservoir.component";
import {TenDayReservoirComponent} from "./reservoir/daily-reservoir/ten-day-reservoir.component";
import {ReservoirDashboardComponent} from "./reservoir/reservoir-dashboard/reservoir-dashboard.component";
import {ModsnowDailyComponent} from "./reservoir/modsnow-daily/modsnow-daily.component";
import {ModsnowYearlyComponent} from "./reservoir/modsnow-yearly/modsnow-yearly.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/region', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'region', component: RegionComponent},
      {path: 'ges', component: GesComponent},
      {path: 'reservoir', component: ReservoirComponent, children: [
          {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
          {path: 'dashboard', component: ReservoirDashboardComponent},
          {path: 'water', children: [
              {path: '', pathMatch: 'full', redirectTo: 'current'},
              {path: 'current', component: HourlyReservoirComponent},
              {path: '10-days', component: TenDayReservoirComponent},
              {path: 'year', component: BlankPageComponent}
            ]},
          {path: 'snow', children: [
              {path: '', pathMatch: 'full', redirectTo: 'current'},
              {path: 'current', component: ModsnowDailyComponent},
              {path: 'all-time', component: ModsnowYearlyComponent}
            ]},
          {path: 'meter', children: [
              {path: '', pathMatch: 'full', redirectTo: 'hydro-post'},
              {path: 'hydro-post', component: BlankPageComponent},
              {path: 'water-meter', component: BlankPageComponent},
              {path: 'indicator', component: BlankPageComponent},
              {path: 'journal', component: BlankPageComponent},
              {path: 'contract', component: BlankPageComponent},
              {path: 'work-meter-works', component: BlankPageComponent}
            ]},
          {path: 'docs', component: BlankPageComponent}
        ]},
    ]
  }
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})]
})
export class AppRoutingModule {}
