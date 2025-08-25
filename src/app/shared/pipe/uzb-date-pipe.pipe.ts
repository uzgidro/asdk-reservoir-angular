import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'uzbDatePipe',
  standalone: true
})
export class UzbDatePipePipe implements PipeTransform {

  transform(value: string | null): string {
    switch (value) {
      case 'Monday':
        return 'Dushanba'
      case 'Tuesday':
        return 'Seshanba'
      case 'Wednesday':
        return 'Chorshanba'
      case 'Thursday':
        return 'Payshanba'
      case 'Friday':
        return 'Juma'
      case 'Saturday':
        return 'Shanba'
      case 'Sunday':
        return 'Yakshanba '
      default:
        return ''
    }
  }

}
