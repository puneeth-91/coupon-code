import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
  }

  @Input() isFocus: boolean;

  ngAfterViewInit() {
    if (this.isFocus == undefined || this.isFocus == true) {
      this.el.nativeElement.focus();
    }
  }
}
