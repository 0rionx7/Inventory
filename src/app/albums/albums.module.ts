import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CoreModule } from '../core/core.module';
import { BooksComponent } from '../book/components/books.component';
import { AlbumEffects } from './store/effects/album.effects';

import * as fromAlbum from './store/reducers';
import { DataResolver } from '../core/data.resolver';

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    RouterModule.forChild([{ path: '', component: BooksComponent }]),
    StoreModule.forFeature(fromAlbum.albumsFeatureKey, fromAlbum.reducers),
    EffectsModule.forFeature([AlbumEffects]),
  ],
})
export class AlbumsModule {}
