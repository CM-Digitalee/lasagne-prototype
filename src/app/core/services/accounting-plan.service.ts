import { Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from './user.service';
import accountingPlan from '../../../fake-data/budget_accounting-plan';
import { Role } from '../../../app/shared';

@Injectable({
  providedIn: 'root'
})
export class AccountingPlanService {
  accountingPlan$ = combineLatest([of(accountingPlan), this.userService.currentUser$]).pipe(
    map(([templateEntries, user]) =>
      templateEntries.filter(entry =>
        (user.role === Role.PM && !!entry.accountIsPmVisible) || [Role.AM, Role.AO].includes(user.role)
      )
    )
  );

  constructor(private userService: UserService) { }
}
