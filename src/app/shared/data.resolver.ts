import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBook from '../book/store/reducers';
import { mockBook } from '../book/models/book';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataResolver implements Resolve<any> {
  constructor(private store: Store) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return state.url === '/MainMenu1'
      ? this.store.pipe(select(fromBook.selectAllBooks), first()) // The Router guards require an observable to complete,which means it has emitted all of its values.
      : [mockBook];
  }
}
