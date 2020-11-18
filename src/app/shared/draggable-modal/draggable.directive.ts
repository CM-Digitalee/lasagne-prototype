import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[draggable]'
})
export class DraggableDirective {
  @Output()
  readonly draggable = fromEvent<MouseEvent>(this.elt.nativeElement, 'mousedown').pipe(
    tap(e => e.preventDefault()),
    switchMap(() => fromEvent<MouseEvent>(this.document, 'mousemove').pipe(
      takeUntil(fromEvent<MouseEvent>(this.document, 'mouseup'))
    ))
  );

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly elt: ElementRef<HTMLElement>
  ) { }
}
