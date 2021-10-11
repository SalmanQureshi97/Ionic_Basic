import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, AccountRoutingModule, IonicModule],
})
export class AccountModule {}
