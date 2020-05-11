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
import { LoginComponent } from './login/login.component';
import { ReqInterceptor } from './shared/request.interceptor';
import { MainContentComponent } from './content/main-content/main-content.component';
import { SubcontentComponent } from './content/subcontent/subcontent.component';
import { EditMenuComponent } from './editMenu/editForm/edit-menu.component';
import { environment } from 'src/environments/environment';
import { TabComponent } from './content/tab/tab.component';
import { TestComponent } from './test/test.component';
import { metaReducers } from './store/reducers';
import { RootEffects } from './store/effects/root.effects';

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
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NavigationModule,
    HttpClientModule,
    RouterModule.forRoot([{ path: '**', redirectTo: '/' }]),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    StoreModule.forRoot(
      {},
      {
        metaReducers,
      }
    ),
    EffectsModule.forRoot([RootEffects]),
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
