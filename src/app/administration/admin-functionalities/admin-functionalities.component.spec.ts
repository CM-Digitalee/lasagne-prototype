import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFunctionalitiesComponent } from './admin-functionalities.component';

describe('AdminFunctionalitiesComponent', () => {
  let component: AdminFunctionalitiesComponent;
  let fixture: ComponentFixture<AdminFunctionalitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFunctionalitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFunctionalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
