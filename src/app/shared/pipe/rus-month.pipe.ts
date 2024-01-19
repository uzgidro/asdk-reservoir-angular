import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rusMonth',
  standalone: true
})
export class RusMonthPipe implements PipeTransform {

  transform(value: string | null): string {
    switch (value) {
      case 'January':
        return 'Январь'
      case 'February':
        return 'Февраль'
      case 'March':
        return 'Март'
      case 'April':
        return 'Апрель'
      case 'May':
        return 'Май'
      case 'June':
        return 'Июнь'
      case 'July':
        return 'Июль'
      case 'August':
        return 'Август'
      case 'September':
        return 'Сентябрь'
      case 'October':
        return 'Октябрь'
      case 'November':
        return 'Ноябрь'
      case 'December':
        return 'Декабрь'

      default:
        return ''
    }
  }

}
