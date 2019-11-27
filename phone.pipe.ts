import { Pipe } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe {
  transform(val) {
    let newStr = '';
    let i;
    for (i = 0; i < (Math.floor(val.length / 3) - 1); i++) {
      newStr = newStr + val.substr(i * 3, 3) + ' - ';
    }
    return newStr + val.substr(i * 3);
  }
}
