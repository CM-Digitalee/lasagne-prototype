import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsRentalDataComponent } from './analytics-rental-data.component';

describe('AnalyticsRentalDataComponent', () => {
  let component: AnalyticsRentalDataComponent;
  let fixture: ComponentFixture<AnalyticsRentalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsRentalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsRentalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
