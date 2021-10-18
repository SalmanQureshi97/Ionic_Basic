import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SignupRoutingModule } from './signup-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
  ],
})
export class SignupModule {}
