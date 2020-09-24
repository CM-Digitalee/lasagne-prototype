import { BudgetVersionState } from '../app/shared';

export default [
  {
    budgetId: 1600597556690,
    id: 1,
    state: BudgetVersionState.Rejected,
    stateDate: 1600866328443,
    stateUserId: 3,
    number: 1,
    accountingPlan: {
      300000: { value: '10000', comment: 'comment 1' },
      310000: { value: '11000', comment: 'comment 2' },
      comment: 'global comment 1'
    }
  },
  {
    budgetId: 1600597556690,
    id: 2,
    state: BudgetVersionState.Pending,
    stateDate: 1600866390450,
    stateUserId: 1,
    number: 2,
    accountingPlan: {
      300000: { value: '-20000', comment: 'comment 3' },
      310000: { value: '22000', comment: 'comment 4' },
      comment: 'global comment 1'
    }
  }
];
