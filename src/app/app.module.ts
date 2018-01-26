import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { RoyalEstatesApiProvider } from "../providers/royal-estates-api/royal-estates-api";
import { PipesModule } from '../pipes/pipes.module';
import { IonicStorageModule } from '@ionic/storage';
import { AgmCoreModule } from '@agm/core';

import {
  EstateHomePage,
  LocationsPage,
  EstatesPage,
  MyEstatesPage,
  OverviewPage,
  MapPage,
} from "../pages/pages";

import { EstateClass } from "./app.component";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { EstatePersistanceProvider } from '../providers/estate-persistance/estate-persistance';

@NgModule({
  declarations: [
    EstateClass,
    EstateHomePage,
    LocationsPage,
    EstatesPage,
    MyEstatesPage,
    OverviewPage,
    MapPage,
  ],
  imports: [
    PipesModule,
    BrowserModule,
    IonicModule.forRoot(EstateClass),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBHunRR2LGg2a-NzzAy7xfqEKWHOqYOyyM'
    }),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    EstateClass,
    EstateHomePage,
    LocationsPage,
    EstatesPage,
    MyEstatesPage,
    OverviewPage,
    MapPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RoyalEstatesApiProvider,
    EstatePersistanceProvider
  ]
})
export class AppModule {}

//apiKey: 'AIzaSyBHunRR2LGg2a-NzzAy7xfqEKWHOqYOyyM'