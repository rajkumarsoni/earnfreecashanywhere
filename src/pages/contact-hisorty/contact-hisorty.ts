import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingCongigurationService } from '../../services/loading-configuration.service';
import { AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFree } from '@ionic-native/admob-free';

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


  contactHistoryDetails: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingService: LoadingCongigurationService,
    public firestore: AngularFirestore, private adMobFree: AdMobFree, private afAuth: AngularFireAuth, private alrtCtrl: AlertController) {
  }

  /** Ionic lifecycle hook. */
  ionViewDidLoad() {
    this.interstitialAdConfig();
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
    this.loadingService.presentLoadingDefault(false);



  }
  bannerAddConfig(){
    const bannerAdd: AdMobFreeBannerConfig = {
      isTesting: true,
      autoShow: true,
      //id: "ca-app-pub-8075364575456646/5652681549"
    };
    this.adMobFree.banner.config(bannerAdd);
  }

  interstitialAdConfig(){
    const interAd: AdMobFreeInterstitialConfig = {
      isTesting: true,
      autoShow: true,
      id: 'ca-app-pub-8075364575456646/7840302129'
      // id: need to add
    }
    this.adMobFree.interstitial.config(interAd);
    this.adMobFree.interstitial.prepare().then(()=>{
      console.log("ad")
    })
  }
}
