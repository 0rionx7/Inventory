import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBook from '../book/store/reducers';
import * as fromAlbum from '../albums/store/reducers';
import { mockBook } from '../book/models/book';
import { first, take, delay, switchMap } from 'rxjs/operators';
import { booksFeatureKey } from '../book/store/reducers/index';

@Injectable({ providedIn: 'root' })
export class DataResolver implements Resolve<any> {
  constructor(private store: Store) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return state.url === '/Books'
      ? this.store.pipe(
          select(fromBook.selectSearchQuery),
          switchMap((query: string) => {
            return !!query
              ? this.store.pipe(select(fromBook.selectSearchResult))
              : this.store.pipe(select(fromBook.selectAllBooks));
          }),
          take(1)edit booksFeatureKey
        )
      : this.store.pipe(
          select(fromBook.selectSearchQuery),
          switchMap((query: string) => {
            return !!query
              ? this.store.pipe(select(fromBook.selectSearchResult))
              : this.store.pipe(select(fromAlbum.selectAllAlbums));
          }),
          take(1)
        ); // The Router guards require an observable to complete,which means it has emitted all of its values.
  }
}
