import { BudgetVersionState } from '../app/shared';

export default [
  {
    budgetId: 1600597556690,
    id: 2,
    state: BudgetVersionState.Pending,
    number: 2,
    accountingPlan: {
      300000: '-20000',
      310000: '22000'
    }
  },
  {
    budgetId: 1600597556690,
    id: 1,
    state: BudgetVersionState.Rejected,
    number: 1,
    accountingPlan: {
      300000: '10000',
      310000: '11000'
    }
  }
];
