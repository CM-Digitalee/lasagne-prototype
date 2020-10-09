import { TestBed } from '@angular/core/testing';

import { ItemsMenuService } from './items-menu.service';

describe('ItemsMenuService', () => {
  let service: ItemsMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
