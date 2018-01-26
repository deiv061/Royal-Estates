import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";

@Injectable()
export class RoyalEstatesApiProvider {

  private baseUrl = "https://royalestate-91686.firebaseio.com/";
  estate: any;
  location: any;

  constructor(public http: HttpClient) {}

  getLocations(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/locations.json`)
      .catch(this.handleError);
  }

  getEstatesData(): Observable<any> {
    this.location = null;
    return this.http
      .get<any>(`${this.baseUrl}/locations.json`)
      .mergeMap((locations: any[]) => {
        if (locations.length > 0) {
        return Observable.forkJoin(
        locations.map((location: any) => {
        return this.http
     .get(`${this.baseUrl}/locations-data/${location.id}.json`)
     .map(estateLocation => {
         if (
             estateLocation !== null &&
             estateLocation["estates"] !== null
            ) {

         for (let i = 0; i < estateLocation["estates"].length; i++) {
              estateLocation["estates"][i]["locationName"] =
              location.name;
              estateLocation["estates"][i]["locationId"] = location.id;
              }
                    return estateLocation["estates"];
              }
                    return [];
                });
            })
          );
        }
        return Observable.of([]);
      });
  }

  getLocationEstateData(location): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/locations-data/${location.id}.json`)
      .map(response => {
        this.location = response;
        for (let i = 0; i < this.location["estates"].length; i++) {
          this.location["estates"][i]["locationName"] = location.name;
          this.location["estates"][i]["locationId"] = location.id;
        }
        return this.location;
      });
  }

  getCurrentEstate() {
    return this.estate;
  }

  getCurrentLocation() {
    return this.location;
  }

  setCurrentEstate(estate: any) {
    this.estate = estate;
  }

  setCurrentLocation(location: any) {
    this.location = location;
  }
  private handleError(err: HttpErrorResponse) {
    console.error(err);
    return Observable.throw(err);
  }
  
}
