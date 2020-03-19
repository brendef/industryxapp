import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { signupPageRoutingModule } from './signup-routing.module';

import { signupPage } from './signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    signupPageRoutingModule
  ],
  declarations: [signupPage]
})
export class signupPageModule {}
