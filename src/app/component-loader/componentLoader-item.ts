import { Type } from '@angular/core';

export class ComponentLoaderItem {
  constructor(public component: Type<any>, public data: any) {}
}
