import { Component, OnInit, HostListener } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromSidenav from './navigation/store/reducers';
import * as fromBook from './book/store/reducers';
import * as fromRoot from './store/reducers';
import { CartActions } from './book/store/actions';
import { Book } from './book/models/book';
import { MenuItem } from './navigation/models/models';
import { CartItem } from './book/models/cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostListener('window:resize')
  onWindowChange() {
    this.pushMainContent = screen.availWidth > 420;
  }
  books$: Observable<Book[]>;
  menuItems$: Observable<MenuItem[]>;
  showAdded$: Observable<boolean>;
  itemAdded$: Observable<CartItem>;
  expandSidenav$: Observable<boolean>;
  currentUrl$: Observable<string[] | string>;
  pushMainContent: boolean;
  loginDiag = false;
  editMenu = false;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.pushMainContent = screen.availWidth > 420;
    this.expandSidenav$ = this.store.pipe(
      select(fromSidenav.selectSidenavExpandSidenav)
    );
    this.books$ = this.store.pipe(select(fromBook.selectAllBooks));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectUrlSegments));
    this.showAdded$ = this.store.pipe(select(fromBook.selectShowAdded));
    this.menuItems$ = this.store.pipe(
      select(fromSidenav.selectSidenavMenuItems)
    );
    this.itemAdded$ = this.store.pipe(
      select(fromBook.selectAllCartItems),
      map((items) => items[items.length - 1])
    );
  }

  backDropClicked() {
    this.store.dispatch(CartActions.closeAdded());
  }
}
