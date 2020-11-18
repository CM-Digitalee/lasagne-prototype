import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[componentHost]',
})
export class ComponentLoaderDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
