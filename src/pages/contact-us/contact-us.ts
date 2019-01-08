import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreDbProvider } from '../../providers/firestore-db/firestore-db';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertConfigurationService } from '../../services/alert-configuration.service';
import { LoadingCongigurationService } from '../../services/loading-configuration.service';
import { AdMobFreeInterstitialConfig, AdMobFree } from '@ionic-native/admob-free';


@IonicPage({
  name: 'contact-us'
})
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {

  message: any;
  fbMessage: any;
  constructor(public navCtrl: NavController,
    public firestore: AngularFirestore,
    private loadingService: LoadingCongigurationService,
    private firestoreDB: FirestoreDbProvider,
    private afAuth: AngularFireAuth,
    private adMobFree: AdMobFree, public navParams: NavParams, private alertConfigService: AlertConfigurationService,) {
  }

  ionViewDidLoad() {
    this.loadingService.presentLoadingDefault(false);
  }

  contactUsMessage(){
    this.loadingService.presentLoadingDefault(true);
    this.afAuth.authState.subscribe(auth => {
      this.firestoreDB.addContactUsMessage(this.message, auth.uid).then(()=>{
        this.loadingService.presentLoadingDefault(false);
        this.alertConfigService.getContactUsAlertConfig();
      })
    })
  }

  goToContactHistory(){
    this.loadingService.presentLoadingDefault(true);
    this.navCtrl.push('contact-history');
  }
  interstitialAdConfig(){
    const interAd: AdMobFreeInterstitialConfig = {
      isTesting: true,
      autoShow: true,
      id: 'ca-app-pub-8075364575456646/6299548807'
      // id: need to add
    }
    this.adMobFree.interstitial.config(interAd);
  }
}
