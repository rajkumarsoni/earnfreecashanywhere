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
    public loadingCtrl: LoadingController,
    private alrtCtrl: AlertController,
    public navCtrl: NavController,
    private firestoreDB: FirestoreDbProvider,
    public firestore: AngularFirestore, private afAuth: AngularFireAuth
  ) { }

  /** Ionic lifecycle hook. */
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

  /** This method is used for claim money. */
  claimMoney() {
    this.randomNumber = parseInt((Math.random() * (50 - 10) + 10).toFixed(0));
    this.firestoreDB.claimMoney(this.randomNumber)
      .then(
        () => {
         let alert =  this.alrtCtrl.create({
            title: 'Claimed Amount',
            message: `Congrats you have earned ${this.randomNumber} points.`,
            buttons: ['ok']
          });
          alert.present();
        }
      );
  }

  /** This variable is used for update money */
  updateMoney() {
    this.randomNumber = parseInt((Math.random() * (50 - 10) + 10).toFixed(0));
    this.userBalanceDetails.claimedBalance += this.randomNumber;
    this.afAuth.authState.subscribe(auth => {
    this.firestoreDB.updateBalance(this.userBalanceDetails.claimedBalance, auth.uid).then(()=>{
      alert("succss");
      let alet =  this.alrtCtrl.create({
        title: 'Claimed Amount',
        message: `Congrats you have earned ${this.randomNumber} points.`,
        buttons: ['ok']
      });
      alet.present();
    });
  })
  }
}
