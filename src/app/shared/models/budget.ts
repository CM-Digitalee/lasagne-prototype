export interface Budget {
  id: number;
  portfolioId: number;
  assetId: number;
  name: string;
}

export interface BudgetVersion {
  id: number;
  budgetId: number;
  number: number;
  state: BudgetVersionState;
  accountingPlan: {
    [key: string]: string;
  };
}

export type BudgetWithVersions = Budget & { versions: BudgetVersion[] };

export enum BudgetVersionState {
  Pending,
  Submitted,
  Accepted,
  Rejected
}
