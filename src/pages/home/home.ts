import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Thumbnail } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreDbProvider } from '../../providers/firestore-db/firestore-db';
import { LoadingCongigurationService } from '../../services/loading-configuration.service';
import { AppRate } from '@ionic-native/app-rate';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

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
    public firestore: AngularFirestore,private admobFree: AdMobFree,private appRate: AppRate, private afAuth: AngularFireAuth, public loadingService: LoadingCongigurationService) {
      this.bannerAddConfig();
  }

  rateApp(){
    this.appRate.preferences = {
      displayAppName: 'Earn Free Cash',
      promptAgainForEachNewVersion: true,
      storeAppURL: {
        android: 'market://details?id=io.ionic.getFreeRipple'
      },
      customLocale:{
        title: 'enjoying %@',
        message:' like this app youPlease rate us and earn 1000 Points.',
        cancelButtonLabel: 'No, Thanks',
        laterButtonLabel: 'Remind Me Later',
        rateButtonLabel: 'Rate Noe'
      },
      callbacks:{
        onRateDialogShow: (rate)=>{
         // alert("details?id=io.ionic.getFreeRipple")
        },
        onButtonClicked: (buttonIndex)=>{
          //alert(buttonIndex);
        },
        handleNegativeFeedback: (a)=>{
         // alert(`${a}xsss`)
        }
      }
    }
    this.appRate.promptForRating(true);
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
    this.loadingService.presentLoadingDefault(true);
    this.navCtrl.push('claim-money');
  }

  goTOWheel(){
    this.loadingService.presentLoadingDefault(true);
    this.navCtrl.push('luckyWheel');
  }

  goToWithdraw(){
    this.loadingService.presentLoadingDefault(true);
    this.navCtrl.push('withdraw-page');
  }

  goToTransactionHistory(){
    this.loadingService.presentLoadingDefault(true);
    this.navCtrl.push('transaction-history');
  }

  goToMyAccounts(){
    this.loadingService.presentLoadingDefault(true);
    this.navCtrl.push('my-account');
  }

  goToHelpPage(){
    this.loadingService.presentLoadingDefault(true);
    this.navCtrl.push('help-page');
  }

  goToContactUsPage(){
    this.loadingService.presentLoadingDefault(true);
    this.navCtrl.push('contact-us');
  }

  goToWatchVideoSection(){
    this.loadingService.presentLoadingDefault(true);
    this.navCtrl.push('watch-video')
  }

  bannerAddConfig(){
    const bannerAdd: AdMobFreeBannerConfig = {
      isTesting: true,
      autoShow: true,
      id: "ca-app-pub-8075364575456646/1072585933"
    };
    this.admobFree.banner.config(bannerAdd);
  }

}
