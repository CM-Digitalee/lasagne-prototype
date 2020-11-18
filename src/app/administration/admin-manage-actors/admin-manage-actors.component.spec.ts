import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageActorsComponent } from './admin-manage-actors.component';

describe('AdminManageActorsComponent', () => {
  let component: AdminManageActorsComponent;
  let fixture: ComponentFixture<AdminManageActorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageActorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
