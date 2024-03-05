import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../service/http.service";
import {Piezometer} from "../../interfaces";

@Component({
  selector: 'app-geslol',
  templateUrl: './geslol.component.html',
  styleUrls: ['./geslol.component.css'],
  standalone:true
})
export class GeslolComponent implements OnInit{

  piezo?: Piezometer

  constructor(private _service: HttpService) {
  }

  ngOnInit(): void {
    this._service.getGesValues().subscribe((piezo) => {
      this.piezo = piezo
    })
  }

}
