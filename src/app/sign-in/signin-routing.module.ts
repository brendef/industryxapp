import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { signinPage } from './signin.page';

const routes: Routes = [
  {
    path: '',
    component: signinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class signinPageRoutingModule {}
