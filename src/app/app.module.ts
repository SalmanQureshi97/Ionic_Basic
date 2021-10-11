import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { Camera } from '@ionic-native/Camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { HttpClientModule } from '@angular/common/http';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { DataService } from './shared/services/data.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql'],
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser,
    SplashScreen,
    StatusBar,
    WebView,
    Camera,
    DataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
