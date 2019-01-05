import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertConfigurationService } from '../../services/alert-configuration.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirestoreDbProvider } from '../../providers/firestore-db/firestore-db';

@IonicPage({
  name: 'update-phone-number'
})
@Component({
  selector: 'page-add-phone-number',
  templateUrl: 'add-phone-number.html',
})
export class AddPhoneNumberPage {

  account: any;
  phoneNumber:any;
  constructor(public navCtrl: NavController,
    public firestore: AngularFirestore,

    private firestoreDB: FirestoreDbProvider,
    private afAuth: AngularFireAuth, public navParams: NavParams, private alertConfigService: AlertConfigurationService,) {
  }

  ionViewDidLoad() {
    try {
      this.afAuth.authState.subscribe(auth => {
        if (auth && auth.email && auth.uid) {
          let fetchedData = this.firestore.collection(`phoneNumber`).doc(`${auth.uid}`).valueChanges();
          fetchedData.subscribe(data => {
           this.account = data;
           this.phoneNumber = this.account.phoneNumber
            //alert(JSON.stringify(data));
          })
        }
      });

    } catch (e) {
      alert(e);
    }

  }

  addPhoneNumber() {

      this.afAuth.authState.subscribe(auth => {
        this.firestoreDB.addPhoneNumber(this.phoneNumber, auth.uid);
      })


  }

}
