import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetVisualizationLayoutComponent } from './budget-visualization-layout.component';

describe('BudgetVisualizationLayoutComponent', () => {
  let component: BudgetVisualizationLayoutComponent;
  let fixture: ComponentFixture<BudgetVisualizationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetVisualizationLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetVisualizationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
