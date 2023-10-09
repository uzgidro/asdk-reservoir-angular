import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GesLayoutComponent} from "./shared/component/ges-layout/ges-layout.component";
import {GesDashboardComponent} from "./ges-dashboard/ges-dashboard.component";

const routes: Routes = [
  {
    path: '', component: GesLayoutComponent, children: [
      {path: '', redirectTo: '/ges/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: GesDashboardComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GesRoutingModule { }
