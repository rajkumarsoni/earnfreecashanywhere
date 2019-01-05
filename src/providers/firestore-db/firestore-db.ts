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

  claimMoney(claimedBalance, uid, isClaimedTime, isSpin, isWatchVideo):any{
    let a,
      claimedTimeInUTC = new Date();
    let claimedTime = isClaimedTime ? claimedTimeInUTC.getTime() + (5 * 60 * 1000) : claimedTimeInUTC.getTime();
    let spinClaimedTime = isSpin ? claimedTimeInUTC.getTime() + (12 * 60 * 1000) : claimedTimeInUTC.getTime();
    let watchVideo = isWatchVideo ? claimedTimeInUTC.getTime() + (120 * 60 * 1000) : claimedTimeInUTC.getTime();
  //  this.afAuth.authState.subscribe(auth => {
    return  this.firestore.doc(`totalBalance/${uid}`).set({
        claimedBalance: claimedBalance,
        currentTime: claimedTimeInUTC.getTime(),
        claimedTime: claimedTime,
        spinWheelTime: spinClaimedTime,
        watchVideo: watchVideo
      })
     // return a;
    // })

  }

  getClaimedMoney() {



  }

  updateBalance(claimedBalance, uid, isSpin, isClaimedTime, isWatchVideo):any {
    let claimedTimeInUTC = new Date();
    let claimedTime = isClaimedTime ? claimedTimeInUTC.getTime() + (5 * 60 * 1000) : claimedTimeInUTC.getTime();
    let spinClaimedTime = isSpin ? claimedTimeInUTC.getTime() + (20 * 60 * 1000) : claimedTimeInUTC.getTime();
    let watchVideo = isWatchVideo ? claimedTimeInUTC.getTime() + (120 * 60 * 1000) : claimedTimeInUTC.getTime();

    return this.firestore.doc(`totalBalance/${uid}`).update({

        claimedBalance: claimedBalance,
        claimedTime: claimedTime,
        spinWheelTime: spinClaimedTime,
        watchVideo: watchVideo
      })



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

  addWithdrawRequest(amount, walletAddress){
    let currentTime = new Date();
    this.afAuth.authState.subscribe(auth =>{
      this.firestore.collection(`${auth.uid}`).add({
        amount: amount,
        walletAddress: walletAddress,
        requestedDate: currentTime.getTime()
      })
    })

  }

  addPhoneNumber(phoneNumber, uid){
   return this.firestore.doc(`phoneNumber/${uid}`).set({
      phoneNumber: phoneNumber
    })
  }

  getPhoneNumber(uid){
    this.firestore.doc(`phoneNumber/${uid}`).valueChanges();
  }

}
