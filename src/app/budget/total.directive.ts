import { AfterViewInit, Directive, Input } from '@angular/core';

@Directive({
  selector: '[total]',
  exportAs: 'total'
})
export class TotalDirective implements AfterViewInit {
  @Input() totalParent: TotalDirective;
  @Input() isRevenue: boolean;
  @Input() isOpex: boolean;

  children: TotalDirective[] = [];

  value = 0;

  get total() {
    return this.children.length
      ? this.children.reduce((total, child) => total + child.total, 0)
      : this.value;
  }

  get totalRevenue() {
    return this.children.length
      ? this.children.reduce((total, child) => total + child.totalRevenue, 0)
      : this.isRevenue ? this.value : 0;
  }

  get totalOpex() {
    return this.children.length
      ? this.children.reduce((total, child) => total + child.totalOpex, 0)
      : this.isOpex ? this.value : 0;
  }

  ngAfterViewInit() {
    if (this.totalParent) { this.totalParent.register(this); }
  }

  register(total: TotalDirective) {
    this.children = [...this.children, total];
  }

  get totalRoot() {
    if (!this.totalParent) { return this; }
    let totalRoot = this.totalParent;
    while (totalRoot.totalParent) { totalRoot = totalRoot.totalParent; }
    return totalRoot;
  }
}
