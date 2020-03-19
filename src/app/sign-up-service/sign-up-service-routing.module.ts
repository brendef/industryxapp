import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpServicePage } from './sign-up-service.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpServicePageRoutingModule {}
