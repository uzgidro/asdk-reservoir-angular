import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import {ModsnowComponent} from "./modsnow/modsnow.component";
import {WaterCurrentComponent} from "./water-current/water-current.component";

const routes: Routes = [{
  path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: 'modsnow', pathMatch: "full"},
    {path: 'water/current', component: WaterCurrentComponent},
    {path: 'modsnow', component: ModsnowComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
