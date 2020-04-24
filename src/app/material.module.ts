import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

const materialComponents = [MatIconModule];

@NgModule({
  declarations: [],
  imports: [materialComponents, CommonModule],
  exports: [materialComponents],
})
export class MaterialModule {}
