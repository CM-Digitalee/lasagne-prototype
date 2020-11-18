export interface BudgetSimulation {
  id: number;
  name: string;
  budgetId: number;
  configuration?: SimulationConfiguration;
}

export interface SimulationConfiguration {
  [key: string]: {
    distribution: Distribution;
    tolerance: SimulationTolerance
  };
}

export type Distribution = MonthDistributionItem[];

export interface MonthDistributionItem {
  month: number;
  value: number;
}

export interface SimulationTolerance {
  min: number;
  max: number;
}

export enum SimulationState {
  Success,
  Warning,
  Danger
}

export enum Periodicity {
  Month,
  Quarter
}
