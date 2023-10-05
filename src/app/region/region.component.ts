import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit{

  currentTime?: Date = new Date()

  ngOnInit() {

    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  private updateTime() {
    console.log('Update')
    this.currentTime = new Date();
  }
}
