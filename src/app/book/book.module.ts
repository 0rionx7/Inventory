import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromBook from './store/reducers';
import { CoreModule } from 'src/app/core/core.module';
import { BooksComponent } from './components/books.component';
import { BookComponent } from './components/book.component';
import { CartComponent } from './components/cart/cart.component';
import { CartEffects } from './store/effects/cart.effects';
import { BookEffects } from './store/effects/book.effects';
import { EditBookComponent } from './components/edit-book/edit-book.component';

@NgModule({
  declarations: [
    BooksComponent,
    BookComponent,
    CartComponent,
    EditBookComponent,
  ],
  imports: [
    CoreModule,
    StoreModule.forFeature(fromBook.booksFeatureKey, fromBook.reducers),
    EffectsModule.forFeature([CartEffects, BookEffects]),
  ],
  exports: [],
})
export class BookModule {}
