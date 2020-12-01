import { Injectable } from '@angular/core';


import { ComponentLoaderItem } from './componentLoader-item';
import { PunchlistComponent} from '../punchlist/punchlist.component';
import { DashboardComponent} from '../dashboard/dashboard.component';

@Injectable()
export class ComponentLoaderService {
  // tslint:disable-next-line:typedef
  getComponents() {
    // Register component. Component will be loaded dynamically with API
    // Replace DashboardComponent with automatic_control component...
    return [
      new ComponentLoaderItem(PunchlistComponent, {name: 'punchlist'}),

      new ComponentLoaderItem(DashboardComponent, {name: 'automatic_control_rental_status'}),
      new ComponentLoaderItem(DashboardComponent, {name: 'automatic_control_balance_sheet'}),
      new ComponentLoaderItem(DashboardComponent, {name: 'automatic_control_profit_and_loss'}),
      new ComponentLoaderItem(DashboardComponent, {name: 'automatic_control_aging'}),
      // new ComponentLoaderItem(DashboardComponent, {name: 'not_found'}), //Page not found in case of no component
    ];
  }
  // tslint:disable-next-line:typedef
  getComponent(name: string) {
    const components = this.getComponents();
    return components.find(x => x.data.name === name);
  }
}
