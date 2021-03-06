import { Component, OnInit, HostListener } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromSidenav from './navigation/store/reducers';
import * as fromBook from './book/store/reducers';
import * as fromRoot from './store/reducers';
import { Book, CartItem } from 'src/app/book/models';
import { Credentials } from './auth/models';
import { AuthActions } from './auth/store/actions';
import { MenuItem } from 'src/app/navigation/models';
import { CartActions } from 'src/app/book/store/actions';
import { ExpandedSidenavActions } from 'src/app/navigation/store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  books$: Observable<Book[]>;
  menuItems$: Observable<MenuItem[]>;
  showAdded$: Observable<{ item: CartItem; amount: number }>;
  expandSidenav$: Observable<boolean>;
  currentUrl$: Observable<string[] | string>;
  pushMainContent: boolean;
  loginDiag = false;
  editMenu = false;
  @HostListener('window:resize')
  onWindowChange() {
    this.pushMainContent = screen.availWidth > 420;
  }
  @HostListener('document:keyup.escape')
  onEsc() {
    this.store.dispatch(ExpandedSidenavActions.closeSidenav());
  }
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.pushMainContent = screen.availWidth > 420;
    this.expandSidenav$ = this.store.pipe(
      select(fromSidenav.selectSidenavExpandSidenav)
    );
    this.menuItems$ = this.store.pipe(
      select(fromSidenav.selectSidenavMenuItems)
    );
    this.books$ = this.store.pipe(select(fromBook.selectAllBooks));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectUrlSegments));
    this.showAdded$ = this.store.pipe(select(fromBook.selectShowAddedItem));
    this.showAdded$.subscribe((show) => {
      if (show.item)
        setTimeout(() => this.store.dispatch(CartActions.closeAdded()), 2000);
    });
  }

  onLogin(credentials: Credentials | null): void {
    this.store.dispatch(AuthActions.logIn({ credentials }));
  }

  backDropClicked(): void {
    this.store.dispatch(CartActions.closeAdded());
  }

  onClick(): void {}
}
