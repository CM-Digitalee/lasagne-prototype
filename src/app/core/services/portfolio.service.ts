import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Portfolio } from '../../../app/shared';
import portfolios from '../../../fake-data/portfolios';
import { AssetService } from './asset.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  portfolios$: Observable<Portfolio[]> = this.assetService.assets$.pipe(
    map(assets => [...new Set(assets.map(a => a.portfolioId))]),
    map(portfolioIds => portfolios.filter(p => portfolioIds.includes(p.id))),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  constructor(private assetService: AssetService) { }
}
