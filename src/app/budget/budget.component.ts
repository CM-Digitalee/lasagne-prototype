import { ChangeDetectionStrategy, Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import templateEntries from '../../fake-data/budget_accounting-plan';

const nodes = (entries: any, key: { id: string, name: string }) =>
  Object.values(
    entries.reduce((acc, entry) =>
      ({
        ...acc,
        ...
        {
          [entry[key.id]]: {
            label: acc[entry[key.name]]?.name || entry[key.name],
            children: [...(acc[entry[key.id]]?.children || []), entry]
          }
        }
      })
      , {})
  );

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('expand', [
      state('true', style({ height: '*' })),
      state('false', style({ height: 0 })),
      transition('* => *', animate('250ms ease-in-out'))
    ])
  ]
})
export class BudgetComponent {
  budget$ = of(templateEntries).pipe(
    map(templateEntries => templateEntries.filter(({ clientId }) => clientId === 3)),
    map(templateEntries =>
      nodes(templateEntries, { id: 'category', name: 'categoryDescription' })
        .map((node: any) => ({
          ...node,
          children: nodes(node.children, { id: 'subCategory', name: 'subCategoryDescription' })
            .map((node: any) => ({
              ...node,
              children: nodes(node.children, { id: 'group', name: 'groupDescription' })
                .map((node: any) => ({
                  ...node,
                  children: [
                    ...node.children.filter(entry => !entry.subAccount),
                    ...nodes(node.children.filter(entry => !!entry.subAccount), { id: 'account', name: 'accountDescription' })
                  ]
                }))
            }))
        }))
    )
  );
}
