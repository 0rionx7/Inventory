import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { Book } from '../models/book';
import { BookActions } from '../store/actions';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styles: [
    `
      .book-card {
        display: flex;
        flex-direction: column;
        padding: 16px;
        margin-bottom: 10px;
        width: 100%;
        height: 320px;
        background-color: whitesmoke;
        box-shadow: 7px 6px 11px -1px rgba(0, 0, 0, 0.7);
      }
      @media (min-width: 420px) {
        .book-card {
          width: 400px;
        }
      }
      .header {
        display: flex;
      }
      .title {
        flex: 1;
        font-size: 24px;
      }
      img {
        width: 60px;
        height: 80px;
      }
      .btn-success {
        background-color: teal;
      }
      .cart {
        align-self: flex-end;
      }
      label {
        font-size: 13px;
        font-weight: 500;
        margin-right: 5px;
      }
      input {
        width: 40px;
        height: 22px;
        margin-right: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
      }
    `,
  ],
})
export class BookComponent implements OnInit {
  @Input() book: Book;

  constructor(private store: Store) {}

  get thumbnail(): string | boolean {
    if (this.book.volumeInfo.imageLinks) {
      return this.book.volumeInfo.imageLinks.smallThumbnail.replace(
        'http:',
        ''
      );
    }
    return false;
  }

  ngOnInit(): void {}

  onClick(amount: number): void {
    this.store.dispatch(
      BookActions.addToCart({
        id: this.book.id,
        amount: +amount,
        product: this.book,
      })
    );
  }
}
