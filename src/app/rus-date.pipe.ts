import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rusDate',
  standalone: true
})
export class RusDatePipe implements PipeTransform {

  transform(value: string | null): string {
    switch (value) {
      case 'Monday':
        return 'Понедельник'
      case 'Tuesday':
        return 'Вторник'
      case 'Wednesday':
        return 'Среда'
      case 'Thursday':
        return 'Четверг'
      case 'Friday':
        return 'Пятница'
      case 'Saturday':
        return 'Суббота'
      case 'Sunday':
        return 'Воскресенье'
      default:
        return ''
    }
  }

}
