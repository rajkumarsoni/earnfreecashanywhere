import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { FirestoreDbProvider } from '../../providers/firestore-db/firestore-db';

import { Subscription } from 'rxjs';
import { timer } from 'rxjs/observable/timer';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertConfigurationService } from '../../services/alert-configuration.service';
import { LoadingCongigurationService } from '../../services/loading-configuration.service';
import { AdMobFreeInterstitialConfig, AdMobFree } from '@ionic-native/admob-free';

@IonicPage({
  name: 'luckyWheel'
})
@Component({
  selector: 'page-lucky-wheel',
  templateUrl: 'lucky-wheel.html',
})
export class LuckyWheelPage {

  spinWheelData = [30, 25, 20, 10, 0, 10, 20, 25, 30];

  /** This variable is used for storing user balance details. */
  userBalanceDetails: any;

  /** This variable is used for subscription. */
  subscription: Subscription;

  constructor(
    public loadingCtrl: LoadingController,
    private alertConfigService: AlertConfigurationService,
    private alrtCtrl: AlertController,
    private loadingService: LoadingCongigurationService,
    public navCtrl: NavController,
    private firestoreDB: FirestoreDbProvider,
    public firestore: AngularFirestore, private afAuth: AngularFireAuth,
    private adMobFree: AdMobFree) {
  }

  ionViewDidLoad() {
    this.interstitialAdConfig();
    try {
      this.afAuth.authState.subscribe(auth => {
        if (auth && auth.email && auth.uid) {
          let abc = this.firestore.collection(`totalBalance`).doc(`${auth.uid}`).valueChanges();
          abc.subscribe(data => {
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

  /**
   * This method is used for claim money using wheel.
   * @param points points which earned by user.
   */
  claimPoints(points) {
    if(!this.userBalanceDetails){
      this.afAuth.authState.subscribe(auth => {
        this.firestoreDB.claimMoney(points, auth.uid, false, true, false).then(() => {
          this.alertConfigService.getClaimedAlertConfig(points);
        })
      });
    }else if (this.userBalanceDetails.spinWheelTime < this.userBalanceDetails.currentTime) {
      this.userBalanceDetails.claimedBalance += points;
      this.afAuth.authState.subscribe(auth => {
        this.firestoreDB.updateBalance(this.userBalanceDetails.claimedBalance, auth.uid, true, false, false).then(() => {
          this.alertConfigService.getClaimedAlertConfig(points);
        })
      });
    } else {
      this.getAlertPopup();
    }
    this.interstitialAdConfig();
  }

/** This method is used for shwoing alert popup. */
  getAlertPopup() {
    let timeRemaining: number = (this.userBalanceDetails.spinWheelTime - this.userBalanceDetails.currentTime);
    let min = Math.floor(timeRemaining / 60000),
      sec: number = parseInt(((timeRemaining % 60000) / 1000).toFixed(0));

      this.alrtCtrl.create({
      title: 'Please Wait...',
      message: `Please comeback after ${min} minute and ${(sec < 10) ? '0' : ''}${sec} second to earn points.`,
      buttons: ['ok']
    }).present();
  }

  interstitialAdConfig(){
    const interAd: AdMobFreeInterstitialConfig = {
      isTesting: true,
      //autoShow: true,
      id: 'ca-app-pub-8075364575456646/6299548807'
      // id: need to add
    }
    this.adMobFree.interstitial.config(interAd);
    this.adMobFree.interstitial.prepare().then(()=>{
      console.log("ad")
    })
  }
}
