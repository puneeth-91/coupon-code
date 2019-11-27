import { Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
// npm i vanilla-text-mask --save
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';

@Directive({
  selector: `fed-mask, [fed-mask], [fedMask]`
})
export class FedMaskDirective implements OnInit, OnDestroy {
  @HostBinding('class.fed-mask') compClass = true;
  fedMask = {
    mask: [
      new RegExp('\\d'),
      new RegExp('\\d'),
      '/',
      new RegExp('\\d'),
      new RegExp('\\d'),
      '/',
      new RegExp('\\d'),
      new RegExp('\\d'),
      new RegExp('\\d'),
      new RegExp('\\d')
    ],
    showMask: false,
    guide: false,
    placeholderChar: '_'
  };

  maskedInputController;

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    this.maskedInputController = textMask.maskInput({
      inputElement: this.element.nativeElement,
      ...this.fedMask
    });
  }

  ngOnDestroy() {
    this.maskedInputController.destroy();
  }
}
