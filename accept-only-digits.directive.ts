import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[acceptOnlyDigitsMask]',
})
export class AcceptOnlyDigitsDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: any) {
    this.onInputChange(event);
  }

  onInputChange(event: any) {
    let newVal = event.replace(/\D/g, '');
    this.ngControl!.valueAccessor!.writeValue(newVal);
    this.ngControl!.control!.setValue(newVal, { emitViewToModelChange: false });
    this.ngControl!.control!.markAsTouched();
    this.ngControl!.control!.updateValueAndValidity();
  }
}
