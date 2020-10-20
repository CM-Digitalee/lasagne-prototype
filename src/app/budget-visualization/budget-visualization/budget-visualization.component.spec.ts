import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetVisualizationComponent } from './budget-visualization.component';

describe('BudgetVisualizationComponent', () => {
  let component: BudgetVisualizationComponent;
  let fixture: ComponentFixture<BudgetVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetVisualizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
