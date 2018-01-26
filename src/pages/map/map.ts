import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoyalEstatesApiProvider } from "../../providers/royal-estates-api/royal-estates-api";
declare var window: any;


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any = {};
  lat: number = 42.687667;
  lng: number = 23.3334983;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customApi: RoyalEstatesApiProvider
  ) {}

  ionViewDidLoad() {
    const estate = this.customApi.getCurrentEstate();
    if (estate) {
      this.lat = estate.latitude;
      this.lng = estate.longitude;
    }
    console.log("ionViewDidLoad MapPage");
  }

  getDirections() { 
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
  }

}
