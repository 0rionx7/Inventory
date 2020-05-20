import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CoreModule } from '../core/core.module';
import { DataResolver } from '../core/data.resolver';
import { BooksComponent } from '../book/components/books.component';
import { AlbumEffects } from './store/effects/album.effects';

import * as fromAlbum from './store/reducers';

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    RouterModule.forChild([
      { path: '', component: BooksComponent, resolve: { items: DataResolver } },
    ]),
    StoreModule.forFeature(fromAlbum.albumsFeatureKey, fromAlbum.reducers),
    EffectsModule.forFeature([AlbumEffects]),
  ],
})
export class AlbumsModule {}
