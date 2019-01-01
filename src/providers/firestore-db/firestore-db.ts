import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
@Injectable()
export class FirestoreDbProvider {

  constructor(public http: HttpClient, public firestore: AngularFirestore, private afAuth: AngularFireAuth, ) {
    console.log('Hello FirestoreDbProvider Provider');
  }

  claimMoney(claimedBalance):any{
    let a,
      claimedTimeInUTC = new Date();
   this.afAuth.authState.subscribe(auth => {
    a =   this.firestore.doc(`totalBalance/${auth.uid}`).set({
        claimedBalance: claimedBalance,
        currentTime: claimedTimeInUTC.getTime(),
        claimedTime: claimedTimeInUTC.getTime() + (5 * 60 * 1000)
      })
      return a;
    })

  }

  getClaimedMoney() {



  }

  updateBalance(claimedBalance, uid):any {
    let claimedTimeInUTC = new Date();
    let a;

    a =  this.firestore.doc(`totalBalance/${uid}`).update({

        claimedBalance: claimedBalance,
        claimedTime: claimedTimeInUTC.getTime() + (5 * 60 * 1000),
        spinWheelTime: claimedTimeInUTC.getTime() + (10 * 60 * 1000)
      })
      return a;


  }

  updateCurrentTime(currentTime) {
    let a;
    this.afAuth.authState.subscribe(auth => {
      a = this.firestore.doc(`totalBalance/${auth.uid}`).update({
        currentTime
      })
    })
    return a;
  }
}
