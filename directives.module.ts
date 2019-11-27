import { NgModule } from '@angular/core';
import { AcceptOnlyDigitsDirective } from './accept-only-digits.directive';
import { AutofocusDirective } from './autofocus.directive';
import { FedMaskDirective } from './mask.directive';
import { PhoneMaskDirective } from './phone-mask.directive';
import { SSNMaskDirective } from './ssn-mask.directive';

@NgModule({
  declarations: [AutofocusDirective, FedMaskDirective, PhoneMaskDirective, SSNMaskDirective, AcceptOnlyDigitsDirective],
  exports: [AutofocusDirective, FedMaskDirective, PhoneMaskDirective, SSNMaskDirective, AcceptOnlyDigitsDirective]
})

export class DirectivesModule { }
