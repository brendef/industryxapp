import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpServicePageRoutingModule } from './sign-up-service-routing.module';

import { SignUpServicePage } from './sign-up-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpServicePageRoutingModule
  ],
  declarations: [SignUpServicePage]
})
export class SignUpServicePageModule {}
