import { BudgetVersionState } from '../app/shared';

export default [
  {
    budgetId: 1,
    id: 1,
    state: BudgetVersionState.Submitted,
    stateDate: 1600866328443,
    stateUserId: 3,
    number: 1,
    accountingPlan: {
      300000: { value: '10000', comment: 'comment 1' },
      comment: 'global comment 1'
    }
  },
  {
    budgetId: 1,
    id: 2,
    state: BudgetVersionState.Rejected,
    stateDate: 1600866390450,
    stateUserId: 3,
    number: 2,
    accountingPlan: {
      300000: { value: '20000', comment: 'comment 2' },
      comment: 'global comment 2'
    }
  },
  {
    budgetId: 1,
    id: 3,
    state: BudgetVersionState.Submitted,
    stateDate: 1600866390450,
    stateUserId: 1,
    number: 3,
    accountingPlan: {
      300000: { value: '30000', comment: 'comment 3' },
    }
  },
  {
    budgetId: 1,
    id: 4,
    state: BudgetVersionState.Accepted,
    stateDate: 1600866390450,
    stateUserId: 1,
    number: 4,
    accountingPlan: {
      300000: { value: '30000', comment: 'comment 3' },
    }
  },
  // {
  //   budgetId: 1,
  //   id: 5,
  //   extension: true,
  //   state: BudgetVersionState.Pending,
  //   stateDate: 1600866390450,
  //   stateUserId: 1,
  //   number: 5,
  //   accountingPlan: {
  //     300000: { value: '30000', extension: '10000', comment: 'comment 3' },
  //   }
  // }
];
