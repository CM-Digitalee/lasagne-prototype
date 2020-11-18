import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableModalComponent } from './draggable-modal.component';

describe('DraggableModalComponent', () => {
  let component: DraggableModalComponent;
  let fixture: ComponentFixture<DraggableModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraggableModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
