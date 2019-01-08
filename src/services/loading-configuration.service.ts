import { Injectable } from "@angular/core";
import { LoadingController } from "ionic-angular";

@Injectable()
export class LoadingCongigurationService {
  constructor(public loadingCtrl: LoadingController) { }

  presentLoadingDefault(isShow) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      dismissOnPageChange:true,
      content: `<div class="lds-hourglass"></div>`,
      duration: 5000
    });

    if (isShow) {
      loading.present();
    }
    if (!isShow) {

      loading.dismiss();

    }
  }
}
