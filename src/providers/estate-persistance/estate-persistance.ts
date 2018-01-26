import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Events } from "ionic-angular";
import _ from "lodash";
/*
  Generated class for the EstatePersistanceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EstatePersistanceProvider {

  savedEstates = [];
  constructor(
    public http: HttpClient,
    private storage: Storage,
    public events: Events
  ) {
    // this.storage.set("savedEstates", "[]");
    storage.get("savedEstates").then(val => {
      const propVal = JSON.parse(val)
      if (!propVal || propVal.length == 0) {
        this.savedEstates = [];
        this.storage.set("savedEstates", "[]");
      } else {
        this.savedEstates = propVal;
      }
      this.events.publish("savedEstates:updated");
    });
  }

  isInSavedEstates(estate: any) {
    return _.some(this.savedEstates, function(est) {
        return est.refNumber === estate.refNumber;
    });
  }

  getSavedEstates() {
    return this.savedEstates;
  }

  addToSavedEstates(estate: any) {
    this.savedEstates.push(estate);
    this.storage.set("savedEstates", JSON.stringify(this.savedEstates));
    this.events.publish("savedEstates:updated");
  }

  removeFromSavedEstates(estate: any) {
    _.remove(this.savedEstates, estate);
    this.storage.set("savedEstates", JSON.stringify(this.savedEstates));
    this.events.publish("savedEstates:updated");
  }

}
