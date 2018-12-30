import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LuckyWheelPage } from './lucky-wheel';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LuckyWheelPage,
  ],
  imports: [
    IonicPageModule.forChild(LuckyWheelPage),
    ComponentsModule
  ],
})
export class LuckyWheelPageModule {}
