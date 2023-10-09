import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./shared/component/main-layout/main-layout.component";
import {GeslolComponent} from "./geslol/geslol.component";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RegionComponent} from "./region/region.component";
import {PiezoComponent} from "./piezo/piezo.component";
import {GesDashboardComponent} from "./ges-dashboard/ges-dashboard.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'region', component: RegionComponent},
      {path: 'ges', component: GesDashboardComponent},
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
