import {Component, Input, OnInit} from '@angular/core';
import {DatePipe, DecimalPipe, NgForOf} from "@angular/common";
import {RusDatePipe} from "../../pipe/rus-date.pipe";

@Component({
  selector: 'app-weather-detailed',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    RusDatePipe,
    DecimalPipe
  ],
  templateUrl: './weather-detailed.component.html',
  styleUrl: './weather-detailed.component.css'
})
export class WeatherDetailedComponent implements OnInit {
  @Input() name: string = ''
  hourlyWeather: { time: Date, icon: string, temperature: number }[] = []
  weeklyWeather: {
    day: Date,
    humidityIcon: 'humidity_high' | 'humidity_mid' | 'humidity_low',
    humidity: number,
    dayIcon: 'sunny' | 'cloud' | 'partly_cloudy_day' | 'cloudy_snowing' | 'rainy' | 'nights_stay' | 'clear_night',
    nightIcon: 'sunny' | 'cloud' | 'partly_cloudy_day' | 'cloudy_snowing' | 'rainy' | 'nights_stay' | 'clear_night',
    dayTemperature: number,
    nightTemperature: number
  }[] = []

  ngOnInit() {
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    let today = new Date().getDate()
    let time = new Date().getHours()
    this.hourlyWeather.push({time: new Date(year, month, today, time++), icon: 'cloudy_snowing', temperature: 10})
    this.hourlyWeather.push({time: new Date(year, month, today, time++), icon: 'cloud', temperature: 9})
    this.hourlyWeather.push({time: new Date(year, month, today, time++), icon: 'cloud', temperature: 9})
    this.hourlyWeather.push({time: new Date(year, month, today, time++), icon: 'sunny', temperature: 7})
    this.hourlyWeather.push({time: new Date(year, month, today, time++), icon: 'sunny', temperature: 6})
    this.hourlyWeather.push({time: new Date(year, month, today, time++), icon: 'cloudy_snowing', temperature: 10})
    this.hourlyWeather.push({time: new Date(year, month, today, time++), icon: 'cloud', temperature: 9})

    this.weeklyWeather.push({
      day: new Date(year, month, today++),
      humidity: 3,
      humidityIcon: "humidity_low",
      dayIcon: "partly_cloudy_day",
      nightIcon: "rainy",
      dayTemperature: 10,
      nightTemperature: 3
    })
    this.weeklyWeather.push({
      day: new Date(year, month, today++),
      humidity: 48,
      humidityIcon: "humidity_mid",
      dayIcon: 'rainy',
      nightIcon: 'nights_stay',
      dayTemperature: 6,
      nightTemperature: -1
    })
    this.weeklyWeather.push({
      day: new Date(year, month, today++),
      humidity: 7,
      humidityIcon: "humidity_low",
      dayIcon: 'partly_cloudy_day',
      nightIcon: 'nights_stay',
      dayTemperature: 5,
      nightTemperature: -3
    })
    this.weeklyWeather.push({
      day: new Date(year, month, today++),
      humidity: 5,
      humidityIcon: "humidity_low",
      dayIcon: 'sunny',
      nightIcon: 'nights_stay',
      dayTemperature: 8,
      nightTemperature: 3
    })
    this.weeklyWeather.push({
      day: new Date(year, month, today++),
      humidity: 2,
      humidityIcon: "humidity_low",
      dayIcon: 'partly_cloudy_day',
      nightIcon: 'nights_stay',
      dayTemperature: 11,
      nightTemperature: 2
    })
    this.weeklyWeather.push({
      day: new Date(year, month, today++),
      humidity: 8,
      humidityIcon: "humidity_low",
      dayIcon: 'partly_cloudy_day',
      nightIcon: 'nights_stay',
      dayTemperature: 12,
      nightTemperature: 3
    })
    this.weeklyWeather.push({
      day: new Date(year, month, today++),
      humidity: 18,
      humidityIcon: "humidity_low",
      dayIcon: 'partly_cloudy_day',
      nightIcon: 'rainy',
      dayTemperature: 11,
      nightTemperature: 1
    })
  }


}
