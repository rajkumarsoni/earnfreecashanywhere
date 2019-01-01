import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FirestoreDbProvider } from '../../providers/firestore-db/firestore-db';
import { TotalBalance } from '../../interface/total-Balance.modal';

import { Subscription } from 'rxjs';
import { timer } from 'rxjs/observable/timer';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage({
  name: 'luckyWheel'
})
@Component({
  selector: 'page-lucky-wheel',
  templateUrl: 'lucky-wheel.html',
})
export class LuckyWheelPage {

  spinWheelData = [40,30,20,10,0,10,20,30,40];

  /** This variable is used for storing user balance details. */
  userBalanceDetails: any;

 /** This variable is used for subscription. */
 subscription: Subscription;

  constructor(
    public loadingCtrl: LoadingController,
    private alrtCtrl: AlertController,
    public navCtrl: NavController,
    private firestoreDB: FirestoreDbProvider,
    public firestore: AngularFirestore, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    try{
      let a;
      this.afAuth.authState.subscribe(auth => {
        if(auth && auth.email && auth.uid){
        let abc = this.firestore.collection(`totalBalance`).doc(`${auth.uid}`).valueChanges();
        abc.subscribe(data=>{
          this.userBalanceDetails = data;
        })
      }
          //this.userBalanceDetails = data;
        })
      ;
      //alert(`aaaa${this.userBalanceDetails.claimedBalance}`);
    }catch(e){
      alert(e);
    }
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
  abc(){

  }
  claimPoints(points){
    let timeRemaining:number =(this.userBalanceDetails.spinWheelTime - this.userBalanceDetails.currentTime);
    if(this.userBalanceDetails.spinWheelTime <  this.userBalanceDetails.currentTime){
    this.userBalanceDetails.claimedBalance += points;
    this.afAuth.authState.subscribe(auth => {
    this.firestoreDB.updateBalance(this.userBalanceDetails.claimedBalance, auth.uid).then(()=>{
      let alert =  this.alrtCtrl.create({
        title: 'Claimed Amount',
        message: `Congrats you have earned ${points} points.`,
        buttons: ['ok']
      });
      alert.present();
    })
    });
  }else{
    let min = Math.floor(timeRemaining/60000);
   let sec:number = parseInt(((timeRemaining % 60000)/ 1000).toFixed(0));
    let alert =  this.alrtCtrl.create({
      title: 'Please Wait...',
      message: `Please comeback after ${min} minute and ${(sec < 10) ? '0' : ''}${sec} second to earn points.`,
      buttons: ['ok']
    });
    alert.present();
  }
  }
}
