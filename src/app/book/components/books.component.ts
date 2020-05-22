import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Book } from '../models/book';
import * as fromRoot from '../../store/reducers';
import * as fromBook from '../store/reducers';

@Component({
  selector: 'app-books',
  template: `
    <div class="container">
      <app-book *ngFor="let book of books$ | async" [book]="book"></app-book>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
      }
    `,
  ],
})
export class BooksComponent implements OnInit {
  books$: Observable<Book[]>;
  count$: Observable<number>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.books$ = this.store.pipe(
      select(fromRoot.selectRouteData),
      pluck('items')
    );
    this.count$ = this.store.pipe(select(fromBook.selectCartTotal));
  }
}
