import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController, NavController, Button } from 'ionic-angular';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import firebase from 'firebase';
import { TotalBalance } from '../../interface/total-Balance.modal';
import { CurrentTime, ServerTime } from '../../interface/timings.interface';
import { FirestoreDbProvider } from '../../providers/firestore-db/firestore-db';
import { Observable, of } from 'rxjs';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs/observable/timer';
import { AngularFirestore } from 'angularfire2/firestore';
import { AlertConfigurationService } from '../../services/alert-configuration.service';
import { LoadingCongigurationService } from '../../services/loading-configuration.service';
import { AdMobFreeBannerConfig, AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@IonicPage({
  name: 'claim-money'
})
@Component({
  selector: 'page-claim',
  templateUrl: 'claim-money.html',
})
export class ClaimMoneyPage {

  /** This variable is used for storing user balance details. */
  userBalanceDetails: any;

  /** This variable is used for subscription. */
  subscription: Subscription;

  /** This varible is used for storing random numbers. */
  randomNumber: any;

  /** @ignore */
  constructor(
    public loadingService: LoadingCongigurationService,
    private alertConfigService: AlertConfigurationService,
    public navCtrl: NavController,
    private firestoreDB: FirestoreDbProvider,
    public firestore: AngularFirestore, private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private admobFree: AdMobFree
  ) {
    this.bannerAddConfig();
   }

  /** Ionic lifecycle hook. */
  ionViewDidLoad() {
    this.interstitialAdConfig();
    try {
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
    this.loadingService.presentLoadingDefault(false);
  }

  /** Angular lifecycle hook */
  ngOnInit() {
    let t = timer(1, 1000);
    this.subscription = t.subscribe(t => {
      this.firestoreDB.updateCurrentTime(this.getCurrentTime());
    });
  }

  /** This method is used for getting current date */
  getCurrentTime() {
    let currentDate = new Date();
    return currentDate.getTime();
  }

  /** This method is used for claim money. */
  claimMoney() {
    this.loadingService.presentLoadingDefault(true);
    this.randomNumber = parseInt((Math.random() * (50 - 10) + 10).toFixed(0));
    this.afAuth.authState.subscribe(auth => {
    this.firestoreDB.claimMoney(this.randomNumber, auth.uid, true, false, false)
      .then(
        () => {
          this.loadingService.presentLoadingDefault(false);
          this.alertConfigService.getClaimedAlertConfig(this.randomNumber);
        }
      )
      ;
      })
  }

  /** This variable is used for update money */
  updateMoney() {
    this.randomNumber = parseInt((Math.random() * (50 - 10) + 10).toFixed(0));
    this.userBalanceDetails.claimedBalance += this.randomNumber;
    this.afAuth.authState.subscribe(auth => {
      this.firestoreDB.updateBalance(this.userBalanceDetails.claimedBalance, auth.uid, false, true, false).then(() => {
        this.alertConfigService.getClaimedAlertConfig(this.randomNumber);
      });
    })
  }

  presentLoadingDefault(isShow) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      dismissOnPageChange:true,
      content: `<div class="lds-hourglass"></div>`
    });

    if (isShow) {
      loading.present();
    }
    if (!isShow) {
      loading.dismiss();


    }
  }

  bannerAddConfig(){
    const bannerAdd: AdMobFreeBannerConfig = {
      isTesting: true,
      autoShow: true,
      id: "ca-app-pub-8075364575456646/5652681549"
    };
    this.admobFree.banner.config(bannerAdd);
  }

  interstitialAdConfig(){
    const interAd: AdMobFreeInterstitialConfig = {
      isTesting: true,
      autoShow: true,
      id: 'ca-app-pub-8075364575456646/6299548807'
    }
    this.admobFree.interstitial.config(interAd);
  }
}
