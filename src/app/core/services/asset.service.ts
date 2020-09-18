import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import assets from 'src/fake-data/assets';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  assets$ = this.userService.currentUser$.pipe(
    map(user => assets.filter(a => a.propertyManagerId === user.id)),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  constructor(private userService: UserService) { }
}
