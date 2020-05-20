import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { MainContentComponent } from './content/main-content/main-content.component';
import { SubcontentComponent } from './content/subcontent/subcontent.component';
import { EditMenuComponent } from './editForm/edit-menu.component';
import { TabComponent } from './content/tab/tab.component';
import { TestComponent } from './test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { BooksComponent } from '../book/components/books.component';
import { BookComponent } from '../book/components/book.component';
import { EllipsisPipe } from '../book/pipes/ellipsis.pipe';

export const DECLARABLES = [
  LoginComponent,
  MainContentComponent,
  SubcontentComponent,
  EditMenuComponent,
  TabComponent,
  TestComponent,
  BooksComponent,
  BookComponent,
  EllipsisPipe,
];

@NgModule({
  declarations: DECLARABLES,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [DECLARABLES, CommonModule, FormsModule],
})
export class CoreModule {}
