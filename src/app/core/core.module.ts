import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { YouTubePlayerModule } from '@angular/youtube-player';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { GoogleMapsModule } from '@angular/google-maps';

import { MainContentComponent } from './content/main-content/main-content.component';
import { SubcontentComponent } from './content/subcontent/subcontent.component';
import { EditMenuComponent } from './editForm/edit-menu.component';
import { TabComponent } from './content/tab/tab.component';
import { TestComponent } from './test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { EllipsisPipe } from '../book/pipes/ellipsis.pipe';
import { AddedToCartComponent } from '../book/components/cart/added-to-cart.component';
import { CartItemComponent } from '../book/components/cart/cart-item.component';
import { Dropdown2Directive } from './dropdown2.directive';

export const DECLARABLES = [
  MainContentComponent,
  SubcontentComponent,
  EditMenuComponent,
  TabComponent,
  TestComponent,
  CartItemComponent,
  AddedToCartComponent,
  EllipsisPipe,
  Dropdown2Directive,
];

@NgModule({
  declarations: DECLARABLES,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    YouTubePlayerModule,
    ClipboardModule,
    GoogleMapsModule,
  ],
  exports: [DECLARABLES, CommonModule, FormsModule, ReactiveFormsModule],
})
export class CoreModule {}
