import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MaterialModule } from './material.module';
import { SideNavSmComponent } from './side-nav-sm/side-nav-sm.component';
import { SideNavExpComponent } from './side-nav-exp/side-nav-exp.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SideNavSmComponent,
    SideNavExpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
