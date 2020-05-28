import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { CoreModule } from '../core/core.module';
import { LoginComponent } from './components/login/login.component';
import * as fromAuth from './store/reducers';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CoreModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
  ],
  exports: [LoginComponent],
})
export class AuthModule {}
