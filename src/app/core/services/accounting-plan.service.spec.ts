import { TestBed } from '@angular/core/testing';

import { AccountingPlanService } from './accounting-plan.service';

describe('AccountingPlanService', () => {
  let service: AccountingPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountingPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
