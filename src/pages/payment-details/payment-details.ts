import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertConfigurationService } from '../../services/alert-configuration.service';

@IonicPage({
  name: 'payments-details'
})
@Component({
  selector: 'page-payment-details',
  templateUrl: 'payment-details.html',
})
export class PaymentDetailsPage {


  selectedAccount: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertConfigService: AlertConfigurationService,) {
this.selectedAccount = this.navParams.data;
console.log("Points",this.selectedAccount);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentDetailsPage');
  }

  requestPayments(amount){
    if(this.selectedAccount.amount === 5000){
      this.alertConfigService.getSuccessfullPaymentsPopup();
    }else{
      this.alertConfigService.getUnSuccessfullPaymentsPopup();
    }
  }
}
