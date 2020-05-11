import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material.module';
import { NavComponent } from './components/nav.component';
import { NavigationComponent } from './containers/navigation.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ActiveRouteComponent } from './components/active-route.component';
import * as fromSidenav from './store/reducers';
import { SidenavEffects } from './store/effects/sidenav.effects';

@NgModule({
  declarations: [
    NavComponent,
    NavigationComponent,
    SidenavComponent,
    ActiveRouteComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    StoreModule.forFeature(
      fromSidenav.navigationFeatureKey,
      fromSidenav.reducers
    ),
    EffectsModule.forFeature([SidenavEffects]),
  ],
  exports: [NavigationComponent, ActiveRouteComponent],
  providers: [],
})
export class NavigationModule {}
