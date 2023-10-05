import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./shared/component/main-layout/main-layout.component";
import {GesComponent} from "./ges/ges.component";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RegionComponent} from "./region/region.component";
import {PiezoComponent} from "./piezo/piezo.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'region', component: RegionComponent},
      {path: 'report', component: GesComponent},
      {path: 'piezo', component: PiezoComponent},
    ]
  }
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
