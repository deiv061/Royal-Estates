import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { RoyalEstatesApiProvider } from "../../providers/royal-estates-api/royal-estates-api";
import { OverviewPage, MapPage,  } from "../pages";

/**
 * Generated class for the EstateHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estate-home',
  templateUrl: 'estate-home.html',
})
export class EstateHomePage {
  estate: any = {};
  OverviewPageTab: any;
  MapPageTab: any;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customApi: RoyalEstatesApiProvider,
    public events: Events
  ) {
    this.estate = navParams.get("item");
    this.estate = this.estate ? this.estate : this.customApi.getCurrentEstate();
    this.OverviewPageTab = OverviewPage;
    this.MapPageTab = MapPage;
    events.unsubscribe("estate:updated");
    events.subscribe("estate:updated", data => {
      events.unsubscribe("estate:updated");
      this.navCtrl.pop();
      this.navCtrl.push(this.navCtrl.getActive().component)
    });
  }

  goHome() {
    this.navCtrl.popToRoot();
  }

}
