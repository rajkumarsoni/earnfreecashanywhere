import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPhoneNumberPage } from './add-phone-number';

@NgModule({
  declarations: [
    AddPhoneNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPhoneNumberPage),
  ],
})
export class AddPhoneNumberPageModule {}
