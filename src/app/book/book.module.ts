import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromBook from './store/reducers';
import { CartEffects } from './store/effects/cart.effects';
import { CoreModule } from '../core/core.module';
import { CartComponent } from './components/cart/cart.component';
import { BooksComponent } from './components/books.component';
import { BookComponent } from './components/book.component';

@NgModule({
  declarations: [BooksComponent, BookComponent, CartComponent],
  imports: [
    CoreModule,
    StoreModule.forFeature(fromBook.booksFeatureKey, fromBook.reducers),
    EffectsModule.forFeature([CartEffects]),
  ],
  exports: [],
})
export class BookModule {}
