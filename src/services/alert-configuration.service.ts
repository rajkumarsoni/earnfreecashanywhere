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

  getPhoneNumberAlertConfig(){
    let alert =  this.alrtCtrl.create({
      title: 'Phone Number',
      message: `Your phone number added successfully.`,
      buttons: ['ok']
    });
    alert.present();
  }

  getSuccessfullPaymentsPopup(){
    let alert =  this.alrtCtrl.create({
      title: 'Requested Successfully',
      message: `You withdraw request recieved successfully you can track your request in transaction history page.`,
      buttons: ['ok']
    });
    alert.present();
  }

  getUnSuccessfullPaymentsPopup(){
    let alert =  this.alrtCtrl.create({
      title: 'Insufficient Balance',
      message: `Your balance is insuffient please try after earning more points.`,
      buttons: ['ok']
    });
    alert.present();
  }

}
