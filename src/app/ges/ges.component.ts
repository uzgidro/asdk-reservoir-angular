import {Component, OnInit} from '@angular/core';
import {HttpService} from "../shared/service/http.service";
import {Piezometer} from "../shared/interfaces";

@Component({
  selector: 'app-ges',
  templateUrl: './ges.component.html',
  styleUrls: ['./ges.component.css']
})
export class GesComponent implements OnInit{

  piezo?: Piezometer

  constructor(private _service: HttpService) {
  }

  ngOnInit(): void {
    this._service.getGesValues().subscribe((piezo) => {
      this.piezo = piezo
    })
  }

}
