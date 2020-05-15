import { Component, OnInit, Input } from '@angular/core';

import { Book } from '../../shared/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styles: [
    `
      .book-card {
        padding: 16px;
        font-size: 24px;
        width: 400px;
        height: 320px;
        background-color: whitesmoke;
        box-shadow: 7px 6px 11px -1px rgba(0, 0, 0, 0.7);
      }
    `,
  ],
})
export class BookComponent implements OnInit {
  @Input() book: Book;

  constructor() {}

  get thumbnail(): string | boolean {
    // if (this.book.volumeInfo.imageLinks) {
    return this.book.volumeInfo.imageLinks.smallThumbnail.replace('http:', '');
    // }
  }

  ngOnInit(): void {}
}
