import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WatchVideoPage } from './watch-video';

@NgModule({
  declarations: [
    WatchVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(WatchVideoPage),
  ],
})
export class WatchVideoPageModule {}
