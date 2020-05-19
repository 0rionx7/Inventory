import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import * as firebase from 'firebase/app';

const materialComponents = [MatIconModule];

export const DATA_BASE = new InjectionToken('FireStore', {
  factory: () => firebase.firestore(),
});

@NgModule({
  declarations: [],
  imports: [materialComponents, CommonModule],
  exports: [materialComponents],
})
export class MaterialModule {}
