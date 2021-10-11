import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeDetailComponent } from './home-detail/home-detail.component';
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [HomeComponent, HomeDetailComponent],
})
export class HomePageModule {}
