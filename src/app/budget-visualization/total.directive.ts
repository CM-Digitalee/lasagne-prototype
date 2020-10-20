import { AfterViewInit, Directive, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[total]',
  exportAs: 'total'
})
export class TotalDirective implements AfterViewInit, OnDestroy {
  @Input() totalParent: TotalDirective;
  @Input() pastYear: number;
  @Input() budget: number;
  @Input() ytd: number;
  @Input() nextBudget: number;
  @Input() isRevenue: boolean;

  children: TotalDirective[] = [];

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

  total(keyValue: string) {
    return this.children.length
      ? this.children.reduce((total, child) => total + child.total(keyValue), 0)
      : this[keyValue];
  }

  totalRevenue(keyValue: string) {
    return this.children.length
      ? this.children.reduce((total, child) => total + child.totalRevenue(keyValue), 0)
      : this.isRevenue ? this[keyValue] : 0;
  }

  totalCharge(keyValue: string) {
    return this.children.length
      ? this.children.reduce((total, child) => total + child.totalCharge(keyValue), 0)
      : !this.isRevenue ? this[keyValue] : 0;
  }
}
