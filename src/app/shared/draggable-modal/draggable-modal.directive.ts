import { ComponentFactoryResolver, ComponentRef, Directive, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { DraggableModalComponent } from './draggable-modal.component';

@Directive({
  selector: '[draggableModal]'
})
export class DraggableModalDirective {
  @Input('draggableModal') tmpl: TemplateRef<any>;

  private modal: ComponentRef<DraggableModalComponent>;

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly cfr: ComponentFactoryResolver
  ) { }

  @HostListener('click') toggle() {
    if (!this.modal) {
      this.modal = this.vcr.createComponent(this.cfr.resolveComponentFactory(DraggableModalComponent));
      this.modal.instance.tmpl = this.tmpl;
    }
    else {
      this.modal.destroy();
      this.modal = null;
    }
  }
}
