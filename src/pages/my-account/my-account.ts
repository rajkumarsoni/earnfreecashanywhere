import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingCongigurationService } from '../../services/loading-configuration.service';


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
    private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
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

}
