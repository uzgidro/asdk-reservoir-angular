import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./shared/component/main-layout/main-layout.component";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RegionComponent} from "./region/region.component";
import {GesComponent} from "./ges/ges.component";
import {ReservoirComponent} from "./reservoir/reservoir.component";
import {BlankPageComponent} from "./shared/temp/blank-page/blank-page.component";
import {HourlyReservoirComponent} from "./reservoir/hourly-reservoir/hourly-reservoir.component";
import {DailyReservoirComponent} from "./reservoir/daily-reservoir/daily-reservoir.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/region', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'region', component: RegionComponent},
      {path: 'ges', component: GesComponent},
      {path: 'reservoir', component: ReservoirComponent, children: [
          {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
          {path: 'dashboard', component: BlankPageComponent},
          {path: 'water', children: [
              {path: '', pathMatch: 'full', redirectTo: 'current'},
              {path: 'current', component: HourlyReservoirComponent},
              {path: '10-days', component: DailyReservoirComponent},
              {path: 'month', component: BlankPageComponent},
              {path: 'all-time', component: BlankPageComponent}
            ]},
          {path: 'snow', children: [
              {path: '', pathMatch: 'full', redirectTo: 'current'},
              {path: 'current', component: BlankPageComponent},
              {path: 'all-time', component: BlankPageComponent}
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
