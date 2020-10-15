import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsReferenceDataComponent } from './analytics-reference-data.component';

describe('AnalyticsReferenceDataComponent', () => {
  let component: AnalyticsReferenceDataComponent;
  let fixture: ComponentFixture<AnalyticsReferenceDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsReferenceDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsReferenceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
