import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-reservoir',
  templateUrl: './reservoir.component.html',
  styleUrls: ['./reservoir.component.css']
})
export class ReservoirComponent implements OnInit {

  times: Date[] = []

  async ngOnInit() {
    this.setInfoTime()
  }

  private setInfoTime() {
    const currentTime = new Date().getHours();
    let currentMonth = new Date().getMonth()
    let currentDate = new Date().getDate()
    let currentYear = new Date().getFullYear()

    let roundedTime: number;

    if (currentTime >= 0 && currentTime < 6) {
      roundedTime = 0;
    } else if (currentTime >= 6 && currentTime < 12) {
      roundedTime = 6;
    } else if (currentTime >= 12 && currentTime < 18) {
      roundedTime = 12;
    } else {
      roundedTime = 18;
    }

    for (let i = 0; i <= 5; i++) {
      this.times.push(new Date(currentYear, currentMonth, currentDate, roundedTime))
      roundedTime -= 6
      if (roundedTime < 0) {
        roundedTime = 18
        if (currentDate == 1) {
          currentDate -= 1
          currentMonth -= 1
        } else {
          currentDate -= 1
        }
      }
    }
  }
}
