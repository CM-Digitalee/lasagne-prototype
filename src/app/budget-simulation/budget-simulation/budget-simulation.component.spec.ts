import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSimulationComponent } from './budget-simulation.component';

describe('BudgetSimulationComponent', () => {
  let component: BudgetSimulationComponent;
  let fixture: ComponentFixture<BudgetSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetSimulationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
