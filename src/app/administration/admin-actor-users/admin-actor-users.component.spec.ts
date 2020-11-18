import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActorUsersComponent } from './admin-actor-users.component';

describe('AdminActorUsersComponent', () => {
  let component: AdminActorUsersComponent;
  let fixture: ComponentFixture<AdminActorUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminActorUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActorUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
