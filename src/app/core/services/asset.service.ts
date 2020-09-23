import { Injectable } from '@angular/core';
import { filter, map, shareReplay } from 'rxjs/operators';

import { UserService } from './user.service';
import assets from '../../../fake-data/assets';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  assets$ = this.userService.currentUser$.pipe(
    filter(user => !!user),
    map(user => assets.filter(a => [a.propertyManagerId, a.assetManagerId, a.assetOwnerId].includes(user.id))),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  constructor(private userService: UserService) { }
}
