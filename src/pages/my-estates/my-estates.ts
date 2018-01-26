import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationsPage, EstateHomePage  } from '../pages';
import { EstatePersistanceProvider } from "../../providers/estate-persistance/estate-persistance";
import { RoyalEstatesApiProvider } from "../../providers/royal-estates-api/royal-estates-api";
import { Events } from "ionic-angular";
/**
 * Generated class for the MyEstatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-estates',
  templateUrl: 'my-estates.html',
})
export class MyEstatesPage {
  estates = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customApi: RoyalEstatesApiProvider,
    public persistance: EstatePersistanceProvider,
    public events: Events
  ) {
    this.estates = this.persistance.getSavedEstates();
    events.subscribe("savedEstates:updated", data => {
      events.unsubscribe("savedEstates:updated");
      this.estates = this.persistance.getSavedEstates();
    });
  }

  itemTapped($event, item) {
    this.customApi.setCurrentEstate(item);
    this.navCtrl.push(EstateHomePage, { item: item });
  }

  goToLocations() {
    this.navCtrl.push(LocationsPage);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MyEstatesPage");
  }

}
