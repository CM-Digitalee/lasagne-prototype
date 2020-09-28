import { AfterViewInit, Directive, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[total]',
  exportAs: 'total'
})
export class TotalDirective implements AfterViewInit, OnDestroy {
  @Input() totalParent: TotalDirective;
  @Input() isRevenue: boolean;
  @Input() isOpex: boolean;
  @Input() previousYear: number;
  @Input() currentYear: number;

  children: TotalDirective[] = [];

  @Input() value = 0;

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

  get totalPreviousYear() {
    return this.children.length
      ? this.children.reduce((total, child) => total + child.totalPreviousYear, 0)
      : this.previousYear;
  }

  get totalCurrentYear() {
    return this.children.length
      ? this.children.reduce((total, child) => total + child.totalCurrentYear, 0)
      : this.currentYear;
  }

  ngAfterViewInit() {
    if (this.totalParent) { this.totalParent.register(this); }
  }

  ngOnDestroy() {
    if (this.totalParent) { this.totalParent.unregister(this); }
  }

  register(total: TotalDirective) {
    this.children = [...this.children, total];
  }

  unregister(total: TotalDirective) {
    this.children = this.children.filter(child => child !== total);
  }

  get totalRoot() {
    if (!this.totalParent) { return this; }
    let totalRoot = this.totalParent;
    while (totalRoot.totalParent) { totalRoot = totalRoot.totalParent; }
    return totalRoot;
  }
}
