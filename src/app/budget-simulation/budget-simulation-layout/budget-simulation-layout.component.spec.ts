import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSimulationLayoutComponent } from './budget-simulation-layout.component';

describe('BudgetSimulationLayoutComponent', () => {
  let component: BudgetSimulationLayoutComponent;
  let fixture: ComponentFixture<BudgetSimulationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetSimulationLayoutComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetSimulationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
