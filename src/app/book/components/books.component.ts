import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Book } from '../models/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: Book[];

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ items }) => (this.books = items));
  }
}
