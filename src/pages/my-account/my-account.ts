import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingCongigurationService } from '../../services/loading-configuration.service';
import { AdMobFreeInterstitialConfig, AdMobFree } from '@ionic-native/admob-free';


@IonicPage({
  name: 'my-account'
})
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
  userProfile: any;
  phoneNumber:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,public firestore: AngularFirestore,
    private loadingService: LoadingCongigurationService,
    private afAuth: AngularFireAuth,
    private adMobFree: AdMobFree
    ) {
  }

  ionViewDidLoad() {
    this.interstitialAdConfig();
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
    this.loadingService.presentLoadingDefault(false);
  }


  goToUpdatePhoneNumber(){
    this.loadingService.presentLoadingDefault(true);
    this.navCtrl.push('update-phone-number');
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
