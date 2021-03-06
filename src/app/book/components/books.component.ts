import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import * as fromRoot from 'src/app/store/reducers';
import * as fromBook from 'src/app/book/store/reducers';
import { Book } from 'src/app/book/models';
import { BookActions } from 'src/app/book/store/actions';

@Component({
  selector: 'app-books',
  template: `
    <div style="text-align: center">
      <input type="text" (keyup)="onTyping($event.target.value)" />
      <div
        class="container"
        *ngIf="(searchedBooks$ | async).length === 0; else searched"
      >
        <app-book *ngFor="let book of books$ | async" [book]="book"></app-book>
      </div>
      <ng-template #searched>
        <div class="container">
          <app-book
            *ngFor="let book of searchedBooks$ | async"
            [book]="book"
          ></app-book>
        </div>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
      }
      input {
        width: 450px;
        height: 40px;
        margin: 10px;
        padding: 5px;
        font-size: 24px;
        border-radious: 4px;
      }
    `,
  ],
})
export class BooksComponent implements OnInit {
  books$: Observable<Book[]>;
  searchedBooks$: Observable<Book[]>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.books$ = this.store.pipe(
      select(fromRoot.selectRouteData),
      pluck('items')
    );
    this.searchedBooks$ = this.store.pipe(select(fromBook.selectSearchResult));
    // this.books$ = this.store.pipe(select(fromBook.selectSearchResult));
  }

  onTyping(query: string) {
    this.store.dispatch(BookActions.searchBook({ query }));
  }
}
