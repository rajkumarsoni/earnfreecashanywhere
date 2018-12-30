import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClaimMoneyPage } from './claim-money';

@NgModule({
  declarations: [
    ClaimMoneyPage,
  ],
  imports: [
    IonicPageModule.forChild(ClaimMoneyPage),
  ],
})
export class ClaimMoneyPageModule {}
