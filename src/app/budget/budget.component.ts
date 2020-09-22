import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { asyncScheduler, iif, of } from 'rxjs';
import { filter, map, pluck, shareReplay, switchMap, tap } from 'rxjs/operators';

import { BudgetVersion, BudgetWithVersionsAndRealised } from '../shared';
import { AccountingPlanService, AssetService, BudgetService, PortfolioService } from '../core';

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
  budget$ = this.route.params.pipe(
    pluck('id'),
    switchMap((id: string) => iif(() => !!id, this.budgetService.get(+id), of({} as BudgetWithVersionsAndRealised))),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  lastVersion$ = this.budget$.pipe(
    filter(budget => !!budget),
    map(budget => budget.versions.find(
      version => version.number === budget.versions.map(v => v.number).sort((a, b) => b - a)[0]
    )),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  currentVersion$ = this.budget$.pipe(
    filter(budget => !!budget),
    switchMap(budget => this.route.queryParams.pipe(
      pluck('version'),
      filter(versionNumber => !!versionNumber),
      map((versionNumber: string) =>
        budget.versions.find(version =>
          version.number === (+versionNumber || budget.versions.map(v => v.number).sort((a, b) => b - a)[0])
        )
      )
    )),
    tap(() => asyncScheduler.schedule(() => this.cdr.detectChanges())),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  accountingPlan$ = this.budget$.pipe(
    switchMap(budget =>
      this.accountingPlanService.accountingPlan$.pipe(
        map(templateEntries => templateEntries.filter(entry => entry.portfolioId === budget.portfolioId)),
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
      )
    )
  );

  constructor(
    public accountingPlanService: AccountingPlanService,
    public assetService: AssetService,
    public portfolioService: PortfolioService,
    public budgetService: BudgetService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  create(portfolioId: number, assetId: number, name: string, dialogRef: MatDialogRef<any>) {
    this.budgetService.create({ portfolioId, assetId, name }).subscribe(
      budget => {
        dialogRef.close();
        this.goToBudget(budget.id);
      }
    );
  }

  save(version: BudgetVersion, form: { [key: string]: string }) {
    this.budgetService.saveVersion({ ...version, accountingPlan: form });
  }

  goToBudget(id: number) {
    this.router.navigate([id], { relativeTo: this.route.snapshot.params.id ? this.route.parent : this.route });
  }
}
