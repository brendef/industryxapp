import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { signupPage } from './signup.page';

const routes: Routes = [
  {
    path: '',
    component: signupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class signupPageRoutingModule {}
