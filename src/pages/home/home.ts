import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreDbProvider } from '../../providers/firestore-db/firestore-db';

@IonicPage({
  name: 'home-page'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  /** This variable is used for storing user balance details. */
  userBalanceDetails: any;

  userProfile: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private firestoreDB: FirestoreDbProvider,
    public firestore: AngularFirestore, private afAuth: AngularFireAuth) {
  }

  /** Ionic lifecycle hook. */
  ionViewDidLoad() {
    try {
      this.afAuth.auth.onAuthStateChanged(user=>{
       if(user){
        this.userProfile = user;

        //alert(JSON.stringify(user))
      }else{
        this.userProfile = null
      }
      });
      // firebase.auth().onAuthStateChanged(user => {
      //   if (user) {
      //     this.userProfile = user;
      //   } else {
      //     this.userProfile = null;
      //   }
      // });
      this.afAuth.authState.subscribe(auth => {
        if (auth && auth.email && auth.uid) {
          let fetchedData = this.firestore.collection(`totalBalance`).doc(`${auth.uid}`).valueChanges();
          fetchedData.subscribe(data => {
            this.userBalanceDetails = data;
          })
        }
      });

    } catch (e) {
      alert(e);
    }

  }

  goToClaim(){
    this.navCtrl.push('claim-money');
  }

  goTOWheel(){
    this.navCtrl.push('luckyWheel');
  }

  goToWithdraw(){
    this.navCtrl.push('withdraw-page');
  }

  goToTransactionHistory(){
    this.navCtrl.push('transaction-history');
  }

  goToMyAccounts(){
    this.navCtrl.push('my-account');
  }

  goToHelpPage(){
    this.navCtrl.push('help-page');
  }

  goToWatchVideoSection(){
    this.navCtrl.push('watch-video')
  }
}
