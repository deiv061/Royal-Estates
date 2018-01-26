import { Component, ViewChild  } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyEstatesPage } from "../pages/pages";
import { LocationsPage, EstatesPage, EstateHomePage } from "../pages/pages";
import { EstatePersistanceProvider } from "../providers/estate-persistance/estate-persistance";
import { RoyalEstatesApiProvider } from "../providers/royal-estates-api/royal-estates-api";

@Component({
  templateUrl: 'app.html'
})
export class EstateClass {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = MyEstatesPage;
  estates = [];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public persistance: EstatePersistanceProvider,
    public customApi: RoyalEstatesApiProvider,
    public events: Events
  ) {
    this.initializeApp();
    this.estates = this.persistance.getSavedEstates();
    events.subscribe("savedEstates:updated", data => {
      events.unsubscribe("savedEstates:updated");
      this.estates = this.persistance.getSavedEstates();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
     
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  itemTapped($event, item) {
    this.customApi.setCurrentEstate(item);
    this.nav.push(EstateHomePage, { item: item });
  }

  openPage(page) {
 
    this.nav.setRoot(page.component);
  }

  goToLocations() {
    this.nav.push(LocationsPage);
  }

  goToSavedEstates() {
    this.nav.push(EstatesPage);
  }
}
