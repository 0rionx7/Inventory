import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Book } from '../models/book';
import { googleBooksEndpoint } from '../../core/rest-const';
import { NoInterceptors } from '../../core/bypassInterceptors';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(
    private noIntercept: NoInterceptors,
    public afs: AngularFirestore
  ) {}

  getBooks(): Observable<Book[]> {
    return this.noIntercept.get<{ items: Book[] }>(googleBooksEndpoint).pipe(
      map((response) => response.items),
      tap((re) => this.saveBooks(re))
    );
  }

  getDataFromFirestore(type: string): Observable<Book[]> {
    return this.afs
      .collection(type)
      .snapshotChanges()
      .pipe(
        map((data) =>
          data.map((docChngAction) => docChngAction.payload.doc.data() as Book)
        )
      );
  }

  saveBooks(books: Book[]): void {
    books.forEach((book) => this.afs.doc(`Albums/${book.id}`).set(book));
  }
}
