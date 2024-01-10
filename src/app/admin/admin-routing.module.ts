import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminMainLayoutComponent} from "./main-layout/admin-main-layout.component";
import {AdminModsnowComponent} from "./modsnow/admin-modsnow.component";
import {AdminWaterCurrentComponent} from "./water-current/admin-water-current.component";
import {AdminHydroWorksComponent} from "./admin-hydro-works/admin-hydro-works.component";

const routes: Routes = [{
  path: '', component: AdminMainLayoutComponent, children: [
    {path: '', redirectTo: 'modsnow', pathMatch: "full"},
    {path: 'water/current', component: AdminWaterCurrentComponent},
    {path: 'modsnow', component: AdminModsnowComponent},
    {path: 'hydro/works', component: AdminHydroWorksComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
