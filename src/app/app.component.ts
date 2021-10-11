import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';
import { DataService } from './shared/services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  loggedIn = false;
  dark = false;
  isLoggedIn;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private dataService: DataService,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();

    this.swUpdate.available.subscribe(async (res) => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload',
          },
        ],
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.dataService.isLoggedIn().then((isLogged) => {
      this.isLoggedIn = isLogged;
    });

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen;
    });
  }

  checkLoginStatus() {
    return this.dataService.isLoggedIn().then((loggedIn) => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.isLoggedIn = true;
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      console.log('WOWOW');
      this.isLoggedIn = true;
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.isLoggedIn = false;
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.dataService.logout().then(() => {
      this.isLoggedIn = false;
      this.updateLoggedInStatus(false);
      this.router.navigateByUrl('/login');
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }
}
