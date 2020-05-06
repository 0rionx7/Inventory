import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { NavComponent } from './components/nav.component';
import { NavigationComponent } from './containers/navigation.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ActiveRouteComponent } from './components/active-route.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavComponent,
    NavigationComponent,
    SidenavComponent,
    ActiveRouteComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [NavigationComponent, ActiveRouteComponent],
  providers: [],
})
export class NavigationModule {}
