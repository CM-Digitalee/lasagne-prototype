export enum ValueType {
  Percent,
  Currency
}

export abstract class PercentConverter {
  abstract valueRef: number;
  abstract valueType: ValueType;
}
