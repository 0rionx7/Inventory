import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Book } from './book';
import { googleBooksEndpoint } from './rest-const';
import { NoInterceptors } from './bypassInterceptors';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient, private noIntercept: NoInterceptors) {}

  getBooks(): Observable<Book[]> {
    return this.noIntercept
      .get<{ items: Book[] }>(googleBooksEndpoint)
      .pipe(map((response) => response.items));
  }
}
