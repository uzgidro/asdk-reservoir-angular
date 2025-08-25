import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'difference',
  standalone: true
})
export class DifferencePipe implements PipeTransform {

  transform(value: string | number | null): string {
    if (value) {
      let number: number
      if (typeof value == 'string') {
        number = parseFloat(value);
      } else {
        number = value;
      }
      if (number > 0) return '+' + number;
      else return number.toString()
    }
    return '';
  }

}
