import { TestBed } from '@angular/core/testing';

import { AppLanguagesService } from './app-languages.service';

describe('AppLanguagesService', () => {
  let service: AppLanguagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppLanguagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
