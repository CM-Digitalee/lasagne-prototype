import { Component, ChangeDetectionStrategy, HostBinding, Input, TemplateRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-draggable-modal',
  templateUrl: './draggable-modal.component.html',
  styleUrls: ['./draggable-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableModalComponent {
  @HostBinding('style.top.px') private top = 0;
  @HostBinding('style.left.px') private left = 0;

  @Input() tmpl: TemplateRef<any>;

  onDrag({ movementX, movementY }: MouseEvent) {
    this.zone.runOutsideAngular(() => {
      this.left += movementX;
      this.top += movementY;
    });
  }

  constructor(private readonly zone: NgZone) { }
}
