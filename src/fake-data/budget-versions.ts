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
      300000: '10000',
      310000: '11000'
    }
  },
  {
    budgetId: 1600597556690,
    id: 2,
    state: BudgetVersionState.Submitted,
    stateDate: 1600866390450,
    stateUserId: 1,
    number: 2,
    accountingPlan: {
      300000: '-20000',
      310000: '22000'
    }
  }
];
