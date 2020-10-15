import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchlistComponent } from './punchlist.component';

describe('PunchlistComponent', () => {
  let component: PunchlistComponent;
  let fixture: ComponentFixture<PunchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PunchlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PunchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
