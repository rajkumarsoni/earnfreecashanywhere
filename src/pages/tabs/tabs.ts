import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Tab1Root, Tab2Root, Tab3Root } from '../';

@IonicPage({
  name: 'TabsPage'
})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;

  tab1Title = "Home";
  tab2Title = "Blogs";
  tab3Title = " ";

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
   // translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
     // this.tab3Title = values['TAB3_TITLE'];
    //});
  }
}
