import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./shared/component/main-layout/main-layout.component";
import {GesComponent} from "./ges/ges.component";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'report', component: GesComponent}
    ]
  }
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}