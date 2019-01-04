import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  name: 'transaction-history'
})
@Component({
  selector: 'page-transaction-history',
  templateUrl: 'transaction-history.html',
})
export class TransactionHistoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionHistoryPage');
  }

}
