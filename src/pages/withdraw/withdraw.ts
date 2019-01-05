import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoreDbProvider } from '../../providers/firestore-db/firestore-db';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertConfigurationService } from '../../services/alert-configuration.service';
import { AngularFirestore } from 'angularfire2/firestore';

@IonicPage({
  name: 'withdraw-page'
})
@Component({
  selector: 'page-withdraw',
  templateUrl: 'withdraw.html',
})
export class WithdrawPage {
  userProfile: any;
  phoneNumber: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private firestoreDB: FirestoreDbProvider,
    public firestore: AngularFirestore,
    private afAuth: AngularFireAuth,  private alertConfigService: AlertConfigurationService,) {
  }

  ionViewDidLoad() {
    this.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
       this.userProfile = user;

       //alert(JSON.stringify(user))
     }else{
       this.userProfile = null
     }
     });
     try {
      this.afAuth.authState.subscribe(auth => {
        if (auth && auth.email && auth.uid) {
          let fetchedData = this.firestore.collection(`phoneNumber`).doc(`${auth.uid}`).valueChanges();
          fetchedData.subscribe(data => {
           this.phoneNumber = data;

            //alert(JSON.stringify(data));
          })
        }
      });

    } catch (e) {
      alert(e);
    }
  }

  paymentDetail(points: number, walletType: string, money: string){
    this.navCtrl.push('payments-details', {amount: points, wallet: walletType, money: money});
  }

}
