import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, FormsModule, IonicModule, SignupRoutingModule],
})
export class SignupModule {}
