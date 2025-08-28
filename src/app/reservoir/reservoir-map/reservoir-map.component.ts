import {Component} from '@angular/core';
import {BrodacastService} from "../../service/brodacast.service";

@Component({
    selector: 'app-reservoir-map',
    imports: [],
    templateUrl: './reservoir-map.component.html',
    styleUrl: './reservoir-map.component.css'
})
export class ReservoirMapComponent {

  constructor(private broadcast: BrodacastService) {
  }

  changeReservoir(reservoirId: number) {
    this.broadcast.changeReservoir(reservoirId)
  }

}
