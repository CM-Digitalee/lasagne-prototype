import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

import { IsNumberValuePipe } from '../../pipes';

@Directive({
  selector: '[inputDigits]'
})
export class InputDigitsDirective {
  @Input() inputDigits: number;

  @HostListener('input', ['$event.target.value'])
  input(value: string) {
    if ((new IsNumberValuePipe()).transform(value)) {
      this.renderer.setProperty(this.elt.nativeElement, 'value', +(+value).toFixed(2));
    }
  }

  constructor(private elt: ElementRef<HTMLInputElement>, private renderer: Renderer2) { }
}
