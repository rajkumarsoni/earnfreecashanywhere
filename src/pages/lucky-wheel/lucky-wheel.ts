import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'luckyWheel'
})
@Component({
  selector: 'page-lucky-wheel',
  templateUrl: 'lucky-wheel.html',
})
export class LuckyWheelPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
spinWheelData = [40,30,20,10,0,10,20,30,40]
  ionViewDidLoad() {
    console.log('ionViewDidLoad LuckyWheelPage', this.spinWheelData);
  }
abc = 0;
  claimPoints(points){

    this.abc = this.abc + points ;
    console.log("aaaaa", this.abc)
  }

}
