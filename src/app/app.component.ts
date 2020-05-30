import { Component, OnInit, HostListener } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Book } from './book/models/book';
import { MenuItem } from './navigation/models/models';
import { CartItem } from './book/models/cart';
import { Credentials } from './auth/models/user';
import { CartActions, BookActions } from './book/store/actions';
import { AuthActions } from './auth/store/actions';
import * as fromSidenav from './navigation/store/reducers';
import * as fromBook from './book/store/reducers';
import * as fromRoot from './store/reducers';
import { BooksService } from './book/services/books.service';

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
  constructor(private store: Store, private bookService: BooksService) {}

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
  }

  onLogin(credentials: Credentials | null): void {
    this.store.dispatch(AuthActions.logIn({ credentials }));
  }

  backDropClicked(): void {
    this.store.dispatch(CartActions.closeAdded());
  }

  onClick(): void {
    this.bookService
      .getDataFromFirestore('books')
      .subscribe((books) => console.log(books));
  }
}
