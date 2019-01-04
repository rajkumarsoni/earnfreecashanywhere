import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';


@IonicPage({
  name: 'transaction-history'
})
@Component({
  selector: 'page-transaction-history',
  templateUrl: 'transaction-history.html',
})
export class TransactionHistoryPage {

withdrawRequestDetails:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firestore: AngularFirestore, private afAuth: AngularFireAuth, private alrtCtrl: AlertController) {
  }

  /** Ionic lifecycle hook. */
  ionViewDidLoad() {
    try {
      this.afAuth.authState.subscribe(auth => {
        if (auth && auth.email && auth.uid) {
          let fetchedData = this.firestore.collection(`${auth.uid}`, ref => ref.orderBy('requestedDate', "desc")).valueChanges();
          fetchedData.subscribe(data => {
            this.withdrawRequestDetails = data;
            //alert(JSON.stringify(data));
            if(this.withdrawRequestDetails == []){
              this.noTransactionPopup();
            }
          })
        }
      });

    } catch (e) {
      alert(e);
    }




  }
  noTransactionPopup(){
    let alert =  this.alrtCtrl.create({
      title: 'Oops...',
      message: `There is no transactions available till now. please earn points and request in withdraw section.`,
      buttons: ['ok']
    });
    alert.present();
  }

}
