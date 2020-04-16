import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

const materialComponents = [
  MatSidenavModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [],
  imports: [materialComponents, CommonModule],
  exports: [materialComponents],
})
export class MaterialModule {}
