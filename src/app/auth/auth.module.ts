import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CoreModule],
  exports: [LoginComponent],
})
export class AuthModule {}
