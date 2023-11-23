import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-reservoir',
  templateUrl: './reservoir.component.html',
  styleUrls: ['./reservoir.component.css']
})
export class ReservoirComponent implements OnInit {
  times = {
    1: '00:00',
  2: '06:00',
  3: '12:00',
  4: '18:00',
  }

  async ngOnInit() {
    this.setInfoTime()
  }

  private setInfoTime() {
    console.log(new Date().getHours())
  }
}
