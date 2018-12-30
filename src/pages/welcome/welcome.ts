import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { MainPage } from '..';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  users: Observable<firebase.User>
  constructor(public navCtrl: NavController,
    private googlePlus: GooglePlus,
    private afAuth: AngularFireAuth) {
      this.users = this.afAuth.authState;
     }

  async doLogin() {
    try {
      const googlePlusUser = await this.googlePlus.login({
        'webClientId': "1025593372255-ne644fmhm1jiapued7hfuvj29mm7igg4.apps.googleusercontent.com",
        'offilne': true
      })
      return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(googlePlusUser.idToken))
      .then(()=>this.navCtrl.push(MainPage))

    } catch (err) {
      console.log(err);
    }
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  login(){
    this.navCtrl.push(MainPage);
  }
}
