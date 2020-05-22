import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from '@angular/fire';

import { NavigationModule } from './navigation/navigation.module';
import { AppComponent } from './app.component';
import { ReqInterceptor } from './core/request.interceptor';
import { environment } from 'src/environments/environment';
import { RootEffects } from './store/effects/root.effects';
import {
  StoreRouterConnectingModule,
  NavigationActionTiming,
} from '@ngrx/router-store';
import { RouterEffects } from './store/effects/router.effects';
import * as fromRoot from './store/reducers';
import { BookModule } from './book/book.module';
import { CoreModule } from './core/core.module';
import { DataResolver } from './core/data.resolver';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    NavigationModule,
    BookModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        { path: '**', redirectTo: '/' },
        {
          path: 'MainMenu2',
          loadChildren: () =>
            import('./albums/albums.module').then((m) => m.AlbumsModule),
          resolve: { items: DataResolver },
        },
      ],
      {
        // onSameUrlNavigation: 'reload',
        preloadingStrategy: PreloadAllModules,
      }
    ),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    StoreModule.forRoot(fromRoot.reducers, {
      // metaReducers,
    }),
    EffectsModule.forRoot([RootEffects, RouterEffects]),
    StoreRouterConnectingModule.forRoot({
      navigationActionTiming: NavigationActionTiming.PostActivation,
      // serializer: CustomSerializer,
      // routerState: RouterState.Minimal,
    }),
    StoreDevtoolsModule.instrument({
      name: 'Inventory',
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ReqInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
