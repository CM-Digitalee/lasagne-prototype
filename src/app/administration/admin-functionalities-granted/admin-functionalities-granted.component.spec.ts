import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFunctionalitiesGrantedComponent } from './admin-functionalities-granted.component';

describe('AdminFunctionalitiesGrantedComponent', () => {
  let component: AdminFunctionalitiesGrantedComponent;
  let fixture: ComponentFixture<AdminFunctionalitiesGrantedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFunctionalitiesGrantedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFunctionalitiesGrantedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
