import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainContentComponent } from './content/main-content/main-content.component';
import { SubcontentComponent } from './content/subcontent/subcontent.component';

const childs = [
  { path: '0', component: SubcontentComponent },
  { path: '1', component: SubcontentComponent },
  { path: '2', component: SubcontentComponent },
];
const routes: Routes = [
  { path: '', component: MainContentComponent },
  {
    path: 'AleLaMachine',
    component: MainContentComponent,
    data: { no: 'Ale' },
    children: childs,
  },
  {
    path: 'AleLaMachine1',
    component: MainContentComponent,
    data: { no: 1 },
    children: childs,
  },
  {
    path: 'AleLaMachine2',
    component: MainContentComponent,
    data: { no: 2 },
    children: childs,
  },
  {
    path: 'AleLaMachine3',
    component: MainContentComponent,
    data: { no: 3 },
    children: childs,
  },
  {
    path: 'AleLaMachine4',
    component: MainContentComponent,
    data: { no: 4 },
    children: childs,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
