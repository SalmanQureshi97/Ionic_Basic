import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.scss'],
})
export class HomeDetailComponent {
  user: any;

  constructor(
    private userData: DataService,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public inAppBrowser: InAppBrowser
  ) {}

  ionViewWillEnter() {
    const username = this.route.snapshot.paramMap.get('username');
    console.log(username);
    this.userData.getUser(username).then((data) => {
      this.user = data;
    });
  }

  openExternalUrl(url: string) {
    this.inAppBrowser.create(url, '_blank');
  }
}
