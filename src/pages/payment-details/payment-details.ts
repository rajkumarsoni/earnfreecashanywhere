import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertConfigurationService } from '../../services/alert-configuration.service';
import { FirestoreDbProvider } from '../../providers/firestore-db/firestore-db';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage({
  name: 'payments-details'
})
@Component({
  selector: 'page-payment-details',
  templateUrl: 'payment-details.html',
})
export class PaymentDetailsPage {

  userBalanceDetails: any;
  selectedAccount: any;
  constructor(public navCtrl: NavController,
    private firestoreDB: FirestoreDbProvider,
    public firestore: AngularFirestore, private afAuth: AngularFireAuth, public navParams: NavParams, private alertConfigService: AlertConfigurationService, ) {
    this.selectedAccount = this.navParams.data;
    console.log("Points", this.selectedAccount);
  }
phoneNumber: any;
  ionViewDidLoad() {
    try {
      this.afAuth.authState.subscribe(auth => {
        if (auth && auth.email && auth.uid) {
          let fetchedData = this.firestore.collection(`totalBalance`).doc(`${auth.uid}`).valueChanges();
          fetchedData.subscribe(data => {
            this.userBalanceDetails = data;
          });
          let fetchedPhoneNumberData = this.firestore.collection(`phoneNumber`).doc(`${auth.uid}`).valueChanges();
          fetchedPhoneNumberData.subscribe(data => {
           this.phoneNumber = data;

            //alert(JSON.stringify(data));
          })
        }
        }
      );

    } catch (e) {
      alert(e);
    }

  }

  requestPayments(amount) {

    if (this.userBalanceDetails.claimedBalance >= amount) {
      this.alertConfigService.getSuccessfullPaymentsPopup();
      this.afAuth.authState.subscribe(auth => {
        let wallet = (this.selectedAccount.wallet == "paypal") ? auth.email : this.phoneNumber.phoneNumber;
        this.firestoreDB.addWithdrawRequest(amount, wallet);
        this.firestoreDB.updateBalance(this.userBalanceDetails.claimedBalance - amount, auth.uid, false, false, false);
      })
    } else {
      this.alertConfigService.getUnSuccessfullPaymentsPopup();
    }
  }
}
