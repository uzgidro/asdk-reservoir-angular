import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'uzbWeather',
  standalone: true
})
export class UzbWeatherPipe implements PipeTransform {

  transform(value: string | undefined) {
    return value ? this.translations[value] || value : value;
  }

  private translations: { [key: string]: string } = {
    // Thunderstorm
    'thunderstorm with light rain': 'engil yomg‘ir bilan momaqaldiroq',
    'thunderstorm with rain': 'yomg‘ir bilan momaqaldiroq',
    'thunderstorm with heavy rain': 'kuchli yomg‘ir bilan momaqaldiroq',
    'light thunderstorm': 'yengil momaqaldiroq',
    'thunderstorm': 'momaqaldiroq',
    'heavy thunderstorm': 'kuchli momaqaldiroq',
    'ragged thunderstorm': 'betartib momaqaldiroq',
    'thunderstorm with light drizzle': 'engil shudring bilan momaqaldiroq',
    'thunderstorm with drizzle': 'shudring bilan momaqaldiroq',
    'thunderstorm with heavy drizzle': 'kuchli shudring bilan momaqaldiroq',

    // Drizzle
    'light intensity drizzle': 'yengil shudring',
    'drizzle': 'shudring',
    'heavy intensity drizzle': 'kuchli shudring',
    'light intensity drizzle rain': 'yengil shudringli yomg‘ir',
    'drizzle rain': 'shudringli yomg‘ir',
    'heavy intensity drizzle rain': 'kuchli shudringli yomg‘ir',
    'shower rain and drizzle': 'yuvuvchi yomg‘ir va shudring',
    'heavy shower rain and drizzle': 'kuchli yuvuvchi yomg‘ir va shudring',
    'shower drizzle': 'yuvuvchi shudring',

    // Rain
    'light rain': 'yengil yomg‘ir',
    'moderate rain': 'o‘rtacha yomg‘ir',
    'heavy intensity rain': 'kuchli yomg‘ir',
    'very heavy rain': 'juda kuchli yomg‘ir',
    'extreme rain': 'o‘ta kuchli yomg‘ir',
    'freezing rain': 'muzlayotgan yomg‘ir',
    'light intensity shower rain': 'yengil yuvuvchi yomg‘ir',
    'shower rain': 'yuvuvchi yomg‘ir',
    'heavy intensity shower rain': 'kuchli yuvuvchi yomg‘ir',
    'ragged shower rain': 'betartib yuvuvchi yomg‘ir',

    // Snow
    'light snow': 'yengil qor',
    'snow': 'qor',
    'heavy snow': 'kuchli qor',
    'sleet': 'muzli yomg‘ir',
    'light shower sleet': 'yengil muzli yomg‘ir',
    'shower sleet': 'yuvuvchi muzli yomg‘ir',
    'light rain and snow': 'yengil yomg‘ir va qor',
    'rain and snow': 'yomg‘ir va qor',
    'light shower snow': 'yengil yuvuvchi qor',
    'shower snow': 'yuvuvchi qor',
    'heavy shower snow': 'kuchli yuvuvchi qor',

    // Atmosphere
    'mist': 'tuman',
    'smoke': 'tutun',
    'haze': 'tutash tuman',
    'sand/dust whirls': 'qum/to‘zon aylanishi',
    'fog': 'qalin tuman',
    'sand': 'qum',
    'dust': 'to‘zon',
    'volcanic ash': 'vulqon kullari',
    'squalls': 'kuchli shamol',
    'tornado': 'tornado',

    // Clear
    'clear sky': 'ochiq osmon',

    // Clouds
    'few clouds': 'ozgina bulutlar',
    'scattered clouds': 'tarqoq bulutlar',
    'broken clouds': 'qisman qalin bulutlar',
    'overcast clouds': 'qalin bulutlar'
  }

}
