import { Injectable } from "@angular/core";
import { LoadingController } from "ionic-angular";

@Injectable()
export class LoadingCongigurationService {
  constructor(public loadingCtrl: LoadingController) { }

  presentLoadingDefault(isShow) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div class="lds-hourglass"></div>`
    });

    if (isShow) {
      loading.present();
    }
    if (!isShow) {

      loading.dismiss();

    }
  }
}
