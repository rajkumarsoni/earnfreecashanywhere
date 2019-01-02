import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";

@Injectable()
export class AlertConfigurationService{


  constructor(private alrtCtrl: AlertController){}

  getClaimedAlertConfig(points){
    let alert =  this.alrtCtrl.create({
      title: 'Claimed Amount',
      message: `Congrats you have earned ${points} points.`,
      buttons: ['ok']
    });
    alert.present();
  }

}
