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
import { SideNavSmComponent } from './components/side-nav-sm.component';
import { SideNavExpComponent } from './components/side-nav-exp.component';
import { SideNavExpContentComponent } from './components/side-nav-exp-content.component';
import { LoginComponent } from './login/login.component';
import { ReqInterceptor } from './shared/request.interceptor';
import { NavigationComponent } from './containers/navigation/navigation.component';
import { MainContentComponent } from './content/main-content/main-content.component';
import { SubcontentComponent } from './content/subcontent/subcontent.component';
import { EditMenuComponent } from './editMenu/editForm/edit-menu.component';
import { environment } from 'src/environments/environment';
import { ArrayInputComponent } from './editMenu/array-input/array-input.component';
import { TabComponent } from './content/tab/tab.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SideNavSmComponent,
    SideNavExpComponent,
    SideNavExpContentComponent,
    LoginComponent,
    NavigationComponent,
    MainContentComponent,
    SubcontentComponent,
    EditMenuComponent,
    ArrayInputComponent,
    TabComponent,
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ReqInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
