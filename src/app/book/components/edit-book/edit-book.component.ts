import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { switchMap, take, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Book } from 'src/app/book/models';
import * as fromBook from 'src/app/book/store/reducers';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent implements OnInit {
  selected = new FormControl();
  books$: Observable<Book[]>;
  editForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.books$ = store.pipe(select(fromBook.selectAllBooks));
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: [''],
      subtitle: [''],
      description: [null],
    });
    this.selected.valueChanges
      .pipe(
        switchMap((value: string) =>
          this.store.pipe(
            select(fromBook.selectBookById, { id: value }),
            take(1)
          )
        ),
        map((book) => book[0].volumeInfo),
        tap((bookInfo) =>
          this.editForm.patchValue({
            title: bookInfo.title,
            subtitle: bookInfo.subtitle,
            description: bookInfo.description,
          })
        )
      )
      .subscribe(console.log);
  }

  onSelected(event): void {
    console.log(event);
    console.log(this.selected);
  }

  onSubmit(): void {
    console.log(this.editForm);
  }
}
