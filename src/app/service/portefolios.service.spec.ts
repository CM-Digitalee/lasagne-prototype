import { TestBed } from '@angular/core/testing';

import { PortefoliosService } from './portefolios.service';

describe('PortefoliosService', () => {
  let service: PortefoliosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortefoliosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
