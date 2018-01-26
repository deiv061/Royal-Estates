import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoyalEstatesApiProvider } from "../../providers/royal-estates-api/royal-estates-api";
import { EstatePersistanceProvider } from "../../providers/estate-persistance/estate-persistance";
import { ToastController, AlertController } from "ionic-angular";
/**
 * Generated class for the OverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})
export class OverviewPage {
  estate: any = {};
  includes = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customApi: RoyalEstatesApiProvider,
    public toastCtrl: ToastController,
    public persistance: EstatePersistanceProvider,
    public alertCtrl: AlertController
  ) {
    this.estate = customApi.getCurrentEstate();
    this.includes = persistance.isInSavedEstates(this.estate);
  }

  saveHandle() {
    if (this.includes) {
      this.showToastWithSelectors();
    } else {
      this.persistance.addToSavedEstates(this.estate);
      this.includes = true;
    }
  }

  showToastWithSelectors() {
    const alert = this.alertCtrl.create({
      title: "Confirm Remove",
      message: "Are you sure you want to remove this estate?",
      buttons: [
        {
          text: "NO",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "YES",
          handler: () => {
            const toast = this.toastCtrl.create({
              message: "Successful you removed the estate.",
              duration: 2000,
              dismissOnPageChange: true
            });
            this.persistance.removeFromSavedEstates(this.estate);
            this.includes = false;
            toast.present();
          }
        }
      ]
    });
    alert.present();
  }

  doRefresh(refresher) {
    this.estate = this.customApi.getCurrentEstate();
    this.includes = this.persistance.isInSavedEstates(this.estate);
    refresher.complete();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OverviewPage");
  }

}
