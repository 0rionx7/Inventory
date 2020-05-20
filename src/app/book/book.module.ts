import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromBook from './store/reducers';
import { BooksComponent } from './components/books.component';
import { CartEffects } from './store/effects/cart.effects';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    StoreModule.forFeature(fromBook.booksFeatureKey, fromBook.reducers),
    EffectsModule.forFeature([CartEffects]),
  ],
  exports: [BooksComponent],
})
export class BookModule {}
