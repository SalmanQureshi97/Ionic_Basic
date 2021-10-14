import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DataService } from 'src/app/shared/services/data.service';
import { NativeHelperService } from 'src/app/shared/services/native-helper.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  username: string;
  imageSrc;
  images = [];
  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: DataService,
    public nativeHelper: NativeHelperService
  ) {}

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
    //this.nativeHelper.addNewToGallery();
    this.nativeHelper.openGallery().then((imageUri) => {
      this.imageSrc = imageUri;
    });
    //this.nativeHelper.openCamera();
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: 'Change Username',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.userData
              .changeUsername(data.username, this.username)
              .then(() => {
                this.getUsername();
              });
          },
        },
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          value: this.username,
          placeholder: 'username',
        },
      ],
    });
    await alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  async changePassword() {
    const alert = await this.alertCtrl.create({
      header: 'Change Password',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.userData
              .changePassword(
                data.currPassword,
                data.newPassword,
                this.username
              )
              .then((result) => {
                console.log(result);
                if (result) {
                  this.success();
                } else {
                  this.dontMatch();
                }
              });
          },
        },
      ],
      inputs: [
        {
          type: 'password',
          name: 'currPassword',
          value: '',
          placeholder: 'Enter Current Password',
        },
        {
          type: 'password',
          name: 'newPassword',
          value: '',
          placeholder: 'New Password',
        },
      ],
    });
    await alert.present();
  }

  async dontMatch() {
    const alert = await this.alertCtrl.create({
      header: 'Incorrect Password Entered',
      buttons: ['Ok'],
    });
    await alert.present();
  }

  async success() {
    const alert = await this.alertCtrl.create({
      header: 'Password Successfully Changed',
      buttons: ['Ok'],
    });
    await alert.present();
  }

  logout() {
    this.userData.logout();
    this.router.navigateByUrl('/login');
  }
}
