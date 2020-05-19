import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from '@angular/fire';

import { NavigationModule } from './navigation/navigation.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/login/login.component';
import { ReqInterceptor } from './shared/request.interceptor';
import { MainContentComponent } from './shared/content/main-content/main-content.component';
import { SubcontentComponent } from './shared/content/subcontent/subcontent.component';
import { EditMenuComponent } from './shared/editForm/edit-menu.component';
import { environment } from 'src/environments/environment';
import { TabComponent } from './shared/content/tab/tab.component';
import { TestComponent } from './shared/test/test.component';
import { metaReducers } from './store/reducers';
import { RootEffects } from './store/effects/root.effects';
import {
  StoreRouterConnectingModule,
  NavigationActionTiming,
  RouterState,
} from '@ngrx/router-store';
import { RouterEffects } from './store/effects/router.effects';
import * as fromRoot from './store/reducers';
import { BookModule } from './book/book.module';
import { CustomSerializer } from './store/reducers/custom-route-serializer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainContentComponent,
    SubcontentComponent,
    EditMenuComponent,
    TabComponent,
    TestComponent,
  ],
  imports: [
    NavigationModule,
    BookModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([{ path: '**', redirectTo: '/' }]),
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
