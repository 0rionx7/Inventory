import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { ReqInterceptor } from './shared/request.interceptor';
import { NavigationComponent } from './containers/navigation/navigation.component';
import { MainContentComponent } from './content/main-content/main-content.component';
import { SubcontentComponent } from './content/subcontent/subcontent.component';
import { EditMenuComponent } from './editMenu/editForm/edit-menu.component';
import { environment } from 'src/environments/environment';
import { TabComponent } from './content/tab/tab.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TestComponent } from './test/test.component';
import { ActiveRouteComponent } from './components/active-route.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    NavigationComponent,
    MainContentComponent,
    SubcontentComponent,
    EditMenuComponent,
    TabComponent,
    SidenavComponent,
    TestComponent,
    ActiveRouteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([{ path: '**', redirectTo: '/' }]),
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    StoreModule.forRoot(reducers, {
      metaReducers,
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
