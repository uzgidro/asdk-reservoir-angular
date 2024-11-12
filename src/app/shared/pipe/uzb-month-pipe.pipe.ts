import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'uzbMonthPipe',
  standalone: true
})
export class UzbMonthPipePipe implements PipeTransform {

  transform(value: string | null): string {
    switch (value) {
      case 'January':
        return 'Yanvar'
      case 'February':
        return 'Fevral'
      case 'March':
        return 'Mart'
      case 'April':
        return 'Aprel'
      case 'May':
        return 'May'
      case 'June':
        return 'Iyun'
      case 'July':
        return 'Iyul'
      case 'August':
        return 'Avgust'
      case 'September':
        return 'Sentabr'
      case 'October':
        return 'Oktabr'
      case 'November':
        return 'Noyabr'
      case 'December':
        return 'Dekabr'

      default:
        return ''
    }
  }

}
