import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the ContactHisortyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'contact-history'
})
@Component({
  selector: 'page-contact-hisorty',
  templateUrl: 'contact-hisorty.html',
})
export class ContactHisortyPage {


contactHistoryDetails:any;

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
          this.contactHistoryDetails = data;
          //alert(JSON.stringify(data));

        })
      }
    });

  } catch (e) {
    alert(e);
  }




}

}
