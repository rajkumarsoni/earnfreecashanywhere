import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { AlertConfigurationService } from '../../services/alert-configuration.service';
import { FirestoreDbProvider } from '../../providers/firestore-db/firestore-db';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { timer } from 'rxjs/observable/timer';
import { LoadingCongigurationService } from '../../services/loading-configuration.service';
import { AdMobFreeInterstitialConfig, AdMobFree } from '@ionic-native/admob-free';

/**
 * Generated class for the WatchVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'watch-video'
})
@Component({
  selector: 'page-watch-video',
  templateUrl: 'watch-video.html',
})
export class WatchVideoPage {

  /** This variable is used for storing user balance details. */
  userBalanceDetails: any;

  /** This variable is used for subscription. */
  subscription: Subscription;

  /** This varible is used for storing random numbers. */
  randomNumber: any;

  /** @ignore */
  constructor(
    public loadingCtrl: LoadingController,
    private alertConfigService: AlertConfigurationService,
    private loadingService: LoadingCongigurationService,
    public navCtrl: NavController,
    private firestoreDB: FirestoreDbProvider,
    public firestore: AngularFirestore, private afAuth: AngularFireAuth,
    private adMobFree: AdMobFree
  ) { }

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
    this.randomNumber = parseInt((Math.random() * (100 - 10) + 10).toFixed(0));
    this.afAuth.authState.subscribe(auth => {
    this.firestoreDB.claimMoney(this.randomNumber, auth.uid, false, false, true)
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
    this.loadingService.presentLoadingDefault(true);
    this.randomNumber = parseInt((Math.random() * (50 - 10) + 10).toFixed(0));
    this.userBalanceDetails.claimedBalance += this.randomNumber;
    this.afAuth.authState.subscribe(auth => {
      this.firestoreDB.updateBalance(this.userBalanceDetails.claimedBalance, auth.uid, false, false, true).then(() => {
        this.loadingService.presentLoadingDefault(false);
        this.alertConfigService.getClaimedAlertConfig(this.randomNumber);
      });
    })
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
