import { Component, OnInit, HostListener } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromSidenav from './navigation/store/reducers';
import * as fromBook from './store/actions/book.actions';
import * as fromRoot from './store/reducers';
import { SidenavService } from './navigation/services/sidenav.service';
import { BooksService } from './shared/books.service';
import { Book } from './shared/book';

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
  $expandSidenav: Observable<boolean>;
  books$: Observable<Book[]>;
  $currentUrl = this.sidenavService.currentUrl;
  pushMainContent: boolean;
  loginDiag = false;
  editMenu = false;
  constructor(
    private store: Store,
    private sidenavService: SidenavService,
    private bookService: BooksService
  ) {}

  ngOnInit(): void {
    this.pushMainContent = screen.availWidth > 420;
    this.$expandSidenav = this.store.pipe(
      select(fromSidenav.selectSidenavExpandSidenav)
    );
    this.bookService
      .getBooks()
      .subscribe((books: Book[]) =>
        this.store.dispatch(fromBook.loadBooks({ books }))
      );
    this.books$ = this.store.pipe(select(fromRoot.selectAllBooks));
  }
}
