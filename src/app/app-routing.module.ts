import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainContentComponent } from './content/main-content/main-content.component';

const routes: Routes = [
  { path: '', component: MainContentComponent },
  {
    path: 'AleLaMachine',
    component: MainContentComponent,
    data: { no: 'Ale' },
  },
  { path: 'AleLaMachine1', component: MainContentComponent, data: { no: 1 } },
  { path: 'AleLaMachine2', component: MainContentComponent, data: { no: 2 } },
  { path: 'AleLaMachine3', component: MainContentComponent, data: { no: 3 } },
  { path: 'AleLaMachine4', component: MainContentComponent, data: { no: 4 } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
