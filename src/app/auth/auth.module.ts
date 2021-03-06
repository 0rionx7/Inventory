import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule } from '../core/core.module';
import { LoginComponent } from './components/login/login.component';
import { AuthEffects } from './store/effects/auth.effects';
import * as fromAuth from './store/reducers';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CoreModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [LoginComponent],
})
export class AuthModule {}
