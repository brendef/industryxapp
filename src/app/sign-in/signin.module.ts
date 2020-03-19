import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { signinPageRoutingModule } from './signin-routing.module';

import { signinPage } from './signin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    signinPageRoutingModule
  ],
  declarations: [signinPage]
})
export class signinPageModule {}
