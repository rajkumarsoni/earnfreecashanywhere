import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FirestoreDbProvider {

  constructor(public http: HttpClient, public firestore: AngularFirestore, private afAuth: AngularFireAuth,) {
    console.log('Hello FirestoreDbProvider Provider');
  }

  claimMoney(claimedBalance): Promise<void>{
    let a;
    //this.afAuth.authState.subscribe(auth => {
      return this.firestore.doc(`totalBalance/raj`).set({
         claimedBalance: claimedBalance
      })
   // })
    //return a;
  }

  getClaimedMoney(){
    let a;
    //this.afAuth.authState.subscribe(auth => {
     a = this.firestore.collection(`totalBalance`).doc(`raj`);
    //})
    return a;
  }

  updateBalance(claimedBalance){
    this.firestore.doc(`totalBalance/raj`).update({
      claimedBalance
    })
  }
}
