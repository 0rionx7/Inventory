import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { MainContentComponent } from './content/main-content/main-content.component';
import { SubcontentComponent } from './content/subcontent/subcontent.component';
import { EditMenuComponent } from './editForm/edit-menu.component';
import { TabComponent } from './content/tab/tab.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    LoginComponent,
    MainContentComponent,
    SubcontentComponent,
    EditMenuComponent,
    TabComponent,
    TestComponent,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
