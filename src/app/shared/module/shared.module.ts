import {NgModule} from '@angular/core';
import {LoaderComponent} from "../component/loader/loader.component";


@NgModule({
  declarations: [LoaderComponent],
  exports: [LoaderComponent]
})
export class SharedModule { }
