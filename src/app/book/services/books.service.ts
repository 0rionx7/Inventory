import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Book } from '../models/book';
import { googleBooksEndpoint } from '../../shared/rest-const';
import { NoInterceptors } from '../../shared/bypassInterceptors';
import * as fromBooks from '../store/reducers';
import { CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(
    private noIntercept: NoInterceptors,
    public firestore: AngularFirestore
  ) {}

  getBooks(): Observable<Book[]> {
    return this.noIntercept
      .get<{ items: Book[] }>(googleBooksEndpoint)
      .pipe(map((response) => response.items));
  }

  getBooksFromFirestore(): Observable<Book[]> {
    return this.firestore
      .collection('books')
      .snapshotChanges()
      .pipe(
        map((data) =>
          data.map((docChngAction) => docChngAction.payload.doc.data() as Book)
        )
      );
  }

  saveBooks(books: Book[]): void {
    books.forEach((book) => this.firestore.doc(`books/${book.id}`).set(book));
  }

  saveInventory(items: CartItem[]): void {
    items.forEach((item) =>
      this.firestore.doc(`Inventory/${item.id}`).set(item)
    );
  }
}
