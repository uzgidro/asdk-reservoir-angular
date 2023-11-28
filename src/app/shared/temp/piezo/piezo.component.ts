import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";
import {Dataset} from "../../interfaces";
import {PizeoService} from "../../service/pizeo.service";

@Component({
  selector: 'app-piezo',
  templateUrl: './piezo.component.html',
  styleUrls: ['./piezo.component.css']
})
export class PiezoComponent implements OnInit {

  piezoChart?: Chart
  groupMap: Record<string, any> = {
    '1': this._service.st1,
    '2': this._service.st2,
    '3': this._service.st3,
    '4': this._service.st4,
    '5': this._service.st5,
    '6': this._service.st6,
    '7': this._service.st7,
    '8': this._service.st8,
    '9': this._service.st9,
    '10': this._service.st10,
    '11': this._service.st11,
    '12': this._service.st12,
  };

  constructor(private _service: PizeoService) {
  }

  ngOnInit() {
    Chart.register(...registerables)
    this.drawChart(this._service.st1)
  }

  tabclick(event: any, group: string) {
    let tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    (event.currentTarget as HTMLElement).className += " active";
    console.log(group)
    let st = this.groupMap[group] || this._service.st1;
    this.drawChart(st)
  }

  drawChart(datasets: Dataset[]) {
    console.log("draw")
    // destroy shown charts
    if (this.piezoChart !== undefined) {
      this.piezoChart.destroy()
    }

    // draw charts
    this.piezoChart = new Chart('PiezoChart', {
      type: 'line',
      data: {
        labels: ['21.09.2023', '22.09.2023', '23.09.2023', '24.09.2023', '25.09.2023', '26.09.2023', '27.09.2023', '28.09.2023', '29.09.2023', '30.09.2023'],
        datasets: [
          {
            label: datasets[0].label,
            data: datasets[0].data,
            backgroundColor: datasets[0].backgroundColor,
            borderColor: datasets[0].borderColor,
            tension: datasets[0].tension
          }
        ]
      },
      options: {
        aspectRatio: 3,
      }
    })

    for (let i = 1; i < datasets.length; i++) {
      this.piezoChart?.data.datasets.push(datasets[i])
    }
    this.piezoChart?.update()
  }
}
