import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ssnMask]',
})
export class SSNMaskDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: any) {
    this.onInputChange(event);
  }

  onInputChange(event: any) {
    let newVal = event.replace(/\D/g, '');
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '$1');
    } else if (newVal.length <= 5) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,2})/, '$1-$2');
    } else if (newVal.length <= 9) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,2})(\d{0,4})/, '$1-$2-$3');
    } else {
      newVal = newVal.substring(0, 9);
      newVal = newVal.replace(/^(\d{0,3})(\d{0,2})(\d{0,4})/, '$1-$2-$3');
    }
    this.ngControl!.valueAccessor!.writeValue(newVal);
    this.ngControl!.control!.setValue(newVal, { emitViewToModelChange: false });
    this.ngControl!.control!.markAsTouched();
    this.ngControl!.control!.updateValueAndValidity();
  }
}
